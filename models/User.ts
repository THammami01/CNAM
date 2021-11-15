import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    registrationNb: String,
    password: String,
    firstname: String,
    lastname: String,
    service: String,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("User", schema);
