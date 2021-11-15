import { NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserData } from "../utils/generateAccessToken";
dotenv.config();

export interface IGetUserAuthRequest extends Request {
  user: IUserData;
}

const authMiddleware: RequestHandler = (req: any, res: any, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

export default authMiddleware;
