const locators = require('../locators/checkoutLocators');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator(locators.checkoutButton);
    this.firstNameInput = page.locator(locators.firstNameInput);
    this.lastNameInput = page.locator(locators.lastNameInput);
    this.postalCodeInput = page.locator(locators.postalCodeInput);
    this.continueButton = page.locator(locators.continueButton);
    this.finishButton = page.locator(locators.finishButton);
    this.completeHeader = page.locator(locators.completeHeader);
  }

  async proceedToCheckout(firstName, lastName, postalCode) {
    await this.checkoutButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async verifyOrderCompletion() {
    await this.page.waitForSelector(locators.completeHeader);
    return this.completeHeader.textContent();
  }
}

module.exports = CheckoutPage;
