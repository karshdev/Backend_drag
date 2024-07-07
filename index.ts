import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import emailRoutes from "./app/routes/sendEmail";
import { initDB } from "./app/utils/initDB";

dotenv.config();

const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const initApp = async (): Promise<void> => {
  await initDB();
  app.use("/api", emailRoutes); 

  http.createServer(app).listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
  });
};

void initApp();
