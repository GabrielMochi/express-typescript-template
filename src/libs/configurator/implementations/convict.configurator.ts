import { Configurator } from "../configurator.interface";
import { ConfigKeysMap } from "#types/config-keys-map.type";
import convict from "convict";
import { ipaddress, url } from "convict-format-with-validator";
import path from "path";
import fs from "fs";
import { FileNotFoundException } from "@exceptions/file-not-found.exception";

export class ConvictConfigurator extends Configurator {
  static {
    convict.addFormat(ipaddress);
    convict.addFormat(url);
  }

  private static readonly convictInstance = convict<ConfigKeysMap>({
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

  load(): ConfigKeysMap {
    const { convictInstance } = ConvictConfigurator;

    const env = convictInstance.get("env");
    if (!env) throw new Error("NODE_ENV must be provided");

    const configFilePath = path.join("src", "config", `${env.toLocaleLowerCase()}.json`);
    if (!fs.existsSync(configFilePath)) throw new FileNotFoundException(configFilePath);

    convictInstance.loadFile(configFilePath);
    convictInstance.validate({ allowed: "strict" });

    return convictInstance.get();
  }
}
