export type AppConfig = {
  env: {
    name: string;
    isProd: boolean;
  };
  jwt: {
    secret: string;
  };
};
