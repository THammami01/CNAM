import jwt from "jsonwebtoken";

export interface IUserData {
  _id: string;
}

const generateAccessToken = (_id: string) => {
  const userData: IUserData = { _id };
  return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET as string);
};

export default generateAccessToken;
