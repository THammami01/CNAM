import { getUniqueShortID } from "./../utils/funcs";
import mongoose from "mongoose";

const getDateWithoutTime = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

// TODO: FIX DATE ISSUE
const schema = new mongoose.Schema(
  {
    ref: {
      type: Number,
      default: getUniqueShortID,
    },
    belongsTo: String,
    belongsToNb: Number,
    lastname: String,
    firstname: String,
    consultationDate: Date,
    refDate: { type: Date, default: getDateWithoutTime },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Ref", schema);
