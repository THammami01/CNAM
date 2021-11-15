import mongoose from "mongoose";


const schema = new mongoose.Schema(
  {
    consultationData: mongoose.SchemaTypes.Mixed,
    drData: mongoose.SchemaTypes.Mixed,
    medsAndAnaylizesData: mongoose.SchemaTypes.Mixed,
    res: mongoose.SchemaTypes.Mixed,
    saveDate: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Entry", schema);
