const env = process.env.ENV || 'dev';

const configs = {
  dev: {
    baseURL: 'https://www.saucedemo.com',
  },
  staging: {
    baseURL: 'https://staging.saucedemo.com',
  },
};

module.exports = configs[env];