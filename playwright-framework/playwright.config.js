module.exports = {
    use: {
      headless: true,
      baseURL: 'https://www.saucedemo.com',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },
    reporter: [['list'], ['html', { open: 'never' }]],
  };
  