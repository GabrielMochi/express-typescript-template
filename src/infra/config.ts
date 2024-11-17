import convict from "convict";
import { ipaddress, url } from "convict-format-with-validator";
import path from "path";
import fs from "fs";

convict.addFormat(ipaddress);
convict.addFormat(url);

export const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  cors: {
    allowedOrigin: {
      doc: "The Access-Control-Allow-Origin response header",
      default: "*",
      env: "CORS_ALLOWED_ORIGIN",
    },
  },
});

const env = config.get("env");
const configFilePath = path.join("src", "config", `${env.toLocaleLowerCase()}.json`);

if (fs.existsSync(configFilePath)) config.loadFile(configFilePath);
config.validate({ allowed: "strict" });
