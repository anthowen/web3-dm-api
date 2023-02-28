import type { AppConfig } from './type';

function loadConfig(): AppConfig {
  const env = process.env.NODE_ENV;
  const isProd = env === 'production';

  if (!env) {
    throw new Error(`Missing 'NODE_ENV'`);
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(`Missing 'DATABASE_URL' environment variable.`);
  }

  const config = {
    env: {
      name: env,
      isProd,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };

  return config;
}

export default loadConfig;
