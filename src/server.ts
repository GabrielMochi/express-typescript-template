/**
 * TODO: create jest configuration
 * TODO: create Swagger configuration
 * TODO: create super app configuration (api test)
 */

import "module-alias/register";
import "reflect-metadata";

import { logger } from "@infra/logger";
import { config } from "@infra/config";
import { app } from "@infra/http-app";

const port = config.get("port");
const ip = config.get("ip");

app.listen(port, ip, () => {
  logger.info(`The server is running on: ${ip}:${port}`);
});
