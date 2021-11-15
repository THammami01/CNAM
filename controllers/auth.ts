import { Request, Response } from "express";
import User from "../models/User";
import { IGetUserAuthRequest } from "../utils/authMiddleware";
import generateAccessToken from "../utils/generateAccessToken";

export const loginController = async (req: Request, res: Response) => {
  const { registrationNb, password } = req.body;

  const user = await User.findOne({
    $and: [{ registrationNb }, { password }],
  });

  if (user)
    res.send({
      statusCode: 200,
      accessToken: generateAccessToken(user._id),
      user: {
        _id: user._id,
        registrationNb: user.registrationNb,
        firstname: user.firstname,
        lastname: user.lastname,
        service: user.service,
      },
    });
  else res.send({ statusCode: 401 }); // Unauthorized
};

export const verifyTokenController = async (
  req: IGetUserAuthRequest,
  res: Response
) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (user)
    res.send({
      statusCode: 200,
      user: {
        _id: user._id,
        registrationNb: user.registrationNb,
        firstname: user.firstname,
        lastname: user.lastname,
        service: user.service,
      },
    });
  else res.send({ statusCode: 404 });
};
