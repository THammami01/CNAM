import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    // tslint:disable-next-line: no-console
    console.log("Connected to MongoDB Database");
  })
  .catch((err) => {
    // tslint:disable-next-line: no-console
    console.log(err);
  });
