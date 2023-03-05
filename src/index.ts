import express, { Application, Request, Response } from "express";
import config from "./config/config";

const app: Application = express();

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
