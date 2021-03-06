const env = {
  staging: {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'staging',
    base: 'http://localhost'
  },
  production: {
    httpPort: 5000,
    httpsPort: 5001,
    base: 'http://localhost',
    envName: 'production'
  }
};

const currentEnv =
  typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const envExport = typeof env[currentEnv] === 'object' ? env[currentEnv] : env.staging;

module.exports = envExport;
