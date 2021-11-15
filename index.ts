import path from "path";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/auth";
import refRouter from "./routers/ref";
import entryRouter from "./routers/entry";
import "./db";
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.get("/", async (_req: Request, res: Response) => {
  // return res.status(200).send({
  //   message: "App is running successfully.",
  // });
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.use("/api/auth", authRouter);
app.use("/api/ref", refRouter);
app.use("/api/entry", entryRouter);

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"), (err) => {
    if (err) res.status(500).send(err);
  });
});

try {
  const PORT = process.env.PORT;
  app.listen(PORT, (): void => {
    // tslint:disable-next-line: no-console
    console.log(`Running at: http://localhost:${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
