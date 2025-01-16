const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CheckoutPage = require('../pages/checkoutPage');
const testData = require('../data/testData.json');

test.describe('Checkout Tests', () => {
  test('Complete checkout process', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/');
    await loginPage.login(testData.users[0].username, testData.users[0].password);
    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();
    await checkoutPage.proceedToCheckout(
      testData.checkoutDetails.firstName,
      testData.checkoutDetails.lastName,
      testData.checkoutDetails.postalCode
    );
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
  });

  test('Add items to cart and validate cart contents', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.users[0].username, testData.users[0].password);
    // Navigate to the products page
    //await page.goto('https://www.saucedemo.com/inventory.html');
  
    // Add a couple of items to the cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
  
    // Go to the cart page
    await page.click('a.shopping_cart_link');
  
    // Validate items in the cart
    await page.waitForSelector('.cart_item');
    const items = await page.$$eval('.inventory_item_name', items => items.map(item => item.textContent));
    expect(items).toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Bike Light');
  });
  

  test('Remove items from cart and validate cart is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.users[0].username, testData.users[0].password);
       
    // Add an item to the cart (setup step)
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    
    await page.goto('https://www.saucedemo.com/cart.html');
    // Remove the item from the cart
    await page.click('button[data-test="remove-sauce-labs-backpack"]');
  
    // Validate the cart is empty
    const cartItems = await page.$$('.cart_item');
    expect(cartItems.length).toBe(0);
  });
  
  
});
