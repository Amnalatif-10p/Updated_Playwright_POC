const locators = require('../locators/inventoryLocators');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.addToCartBackpack = page.locator(locators.addToCartBackpack);
    this.addToCartBikeLight = page.locator(locators.addToCartBikeLight);
    this.cartLink = page.locator(locators.cartLink);
  }

  async addItemToCart(item) {
    if (item === 'backpack') {
      await this.addToCartBackpack.click();
    } else if (item === 'bike-light') {
      await this.addToCartBikeLight.click();
    }
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = InventoryPage;
