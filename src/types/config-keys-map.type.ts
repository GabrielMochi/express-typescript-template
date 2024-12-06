export type ConfigKeysMap = {
  env: "production" | "development" | "test";
  ip: string;
  port: number;
  cors: {
    allowedOrigin: string;
  };
};
