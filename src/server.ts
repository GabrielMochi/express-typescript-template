/**
 * TODO: create Swagger configuration
 * TODO: create super app configuration (api test)
 * TODO: improve test coverage
 */

import "module-alias/register";
import "reflect-metadata";

import { logger } from "@infra/logger";
import { ConfiguratorProvider } from "@libs/configurator";
import { app } from "@infra/http-app";

const config = ConfiguratorProvider.getInstance();
const port = config.get("port");
const ip = config.get("ip");

app.listen(port, ip, () => {
  logger.info(`The server is running on: ${ip}:${port}`);
});
