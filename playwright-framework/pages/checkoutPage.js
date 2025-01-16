class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.checkoutButton = page.locator('button[data-test="checkout"]');
      this.firstNameInput = page.locator('#first-name');
      this.lastNameInput = page.locator('#last-name');
      this.postalCodeInput = page.locator('#postal-code');
      this.continueButton = page.locator('#continue');
      this.finishButton = page.locator('button[data-test="finish"]');
    }


    async proceedToCheckout(firstName, lastName, postalCode) {
      await this.checkoutButton.click();
      await this.firstNameInput.fill(firstName);  
      await this.lastNameInput.fill(lastName);  
      await this.postalCodeInput.fill(postalCode);
    // await this.page.waitForSelector('button[data-test="continue"]', { state: 'visible', timeout: 10000 });
    await this.continueButton.click();  
      await this.finishButton.click();
    }
  }
  module.exports = CheckoutPage;
  