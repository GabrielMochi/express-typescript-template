import express from "express";
import pinoHttp from "pino-http";
import { logger } from "./logger";
import { config } from "./config";
import cors from "cors";
// import { routes } from "@routes/index";
import { errorHandler } from "@middlewares/error-handler.middleware";
import bodyParser from "body-parser";
import path from "path";
import helmet from "helmet";

export const app = express();

app.use(pinoHttp({ logger }));
app.set("trust proxy", 1);

app.use(cors({ origin: config.get("cors.allowedOrigin"), credentials: true }));
app.use(helmet());
app.use(bodyParser.json());
app.use("/docs", express.static(path.join(process.cwd(), "docs")));
// app.use("/", routes);

app.get("/health", async (req, res) => {
  res.json({ health: "ok" });
});

app.use(errorHandler);
