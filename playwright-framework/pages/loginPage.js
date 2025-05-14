const locators = require('../locators/loginLocators');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(locators.usernameInput);
    this.passwordInput = page.locator(locators.passwordInput);
    this.loginButton = page.locator(locators.loginButton);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
