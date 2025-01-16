class InventoryPage {
    constructor(page) {
      this.page = page;
      this.inventoryItems = page.locator('.inventory_item');
      this.addToCartButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
      this.cartBadge = page.locator('.shopping_cart_badge');
    }
  
    async addItemToCart() {
      await this.addToCartButton.click();
    }
  
    async goToCart() {
      await this.page.locator('.shopping_cart_link').click();
    }
  }
  module.exports = InventoryPage;
  