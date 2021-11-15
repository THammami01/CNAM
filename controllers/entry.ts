import { Request, Response } from "express";
import Ref from "../models/Ref";
import Entry from "../models/Entry";

interface IConsultationData {
  consultationDate: string;
  ref: number;
}

export const checkConsultationDataController = (
  req: Request,
  res: Response
) => {
  const consultationData: IConsultationData = req.body;

  Ref.findOne(consultationData, (error: any, results: any) => {
    if (error) res.sendStatus(500);
    else {
      // TODO: CHECK WHETHER REFERENCE IS SAVED IN ENTRIES COLLECTION
      res.send({ isConsultationRegistered: results ? true : false });
    }
  });
};

export const saveEntryDataController = (req: Request, res: Response) => {
  const newEntry = new Entry(req.body);

  newEntry.save((err: any, results: any) => {
    if (err) res.sendStatus(500);
    else res.send(results);
  });
};
