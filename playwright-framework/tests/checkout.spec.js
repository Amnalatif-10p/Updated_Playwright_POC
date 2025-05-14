const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CheckoutPage = require('../pages/checkoutPage');
const testData = require('../data/testData.json');
const routes = require('../config/routes');

test.describe('Checkout Tests', () => {
  test('Complete checkout process', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto(routes.loginPage);
    await loginPage.login(
      testData.users.standardUser.username,
      testData.users.standardUser.password
    );
    await inventoryPage.addItemToCart('backpack');
    await inventoryPage.goToCart();
    await checkoutPage.proceedToCheckout(
      testData.checkoutDetails.firstName,
      testData.checkoutDetails.lastName,
      testData.checkoutDetails.postalCode
    );
    const confirmationText = await checkoutPage.verifyOrderCompletion();
    expect(confirmationText).toContain('Thank you for your order!');
  });

  test('Add items to cart and validate cart contents', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto(routes.loginPage);
    await loginPage.login(
      testData.users.standardUser.username,
      testData.users.standardUser.password
    );
    await inventoryPage.addItemToCart('backpack');
    await inventoryPage.addItemToCart('bike-light');
    await inventoryPage.goToCart();

    const items = await page.$$eval('.inventory_item_name', items =>
      items.map(item => item.textContent)
    );
    expect(items).toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Bike Light');
  });

  test('Remove items from cart and validate cart is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto(routes.loginPage);
    await loginPage.login(
      testData.users.standardUser.username,
      testData.users.standardUser.password
    );
    await inventoryPage.addItemToCart('backpack');
    await inventoryPage.goToCart();
    await page.click('button[data-test="remove-sauce-labs-backpack"]');

    const cartItems = await page.$$('.cart_item');
    expect(cartItems.length).toBe(0);
  });
});
