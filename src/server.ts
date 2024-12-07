/**
 * TODO: create Swagger configuration
 * TODO: create super app configuration (api test)
 * TODO: improve test coverage
 */

import "module-alias/register";
import "reflect-metadata";

import { LoggerProvider } from "@libs/logger";
import { ConfiguratorProvider } from "@libs/configurator";
import { app } from "@infra/http-app";

const config = ConfiguratorProvider.getInstance();
const logger = LoggerProvider.getInstance();

const port = config.get("port");
const ip = config.get("ip");

app.listen(port, ip, () => {
  logger.info("The server is running on: %s:%d", ip, port);
});
