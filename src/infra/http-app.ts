import express from "express";
import pinoHttp from "pino-http";
import { PinoLogger } from "@libs/logger/implementations/pino.logger";
import { ConfiguratorProvider } from "@libs/configurator";
import cors from "cors";
// import { routes } from "@routes/index";
import { errorHandler } from "@middlewares/error-handler.middleware";
import bodyParser from "body-parser";
import path from "path";
import helmet from "helmet";

const config = ConfiguratorProvider.getInstance();

export const app = express();

app.use(pinoHttp({ logger: PinoLogger.pinoInstance }));
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
