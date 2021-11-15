import { Request, Response } from "express";
import Ref from "../models/Ref";

export const postRefController = (req: Request, res: Response) => {
  const newRef = new Ref(req.body);

  newRef.save((err: any, results: any) => {
    if (err) res.sendStatus(500);
    else res.send(results);
  });
};
