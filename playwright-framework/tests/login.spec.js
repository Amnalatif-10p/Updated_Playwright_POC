const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const testData = require('../data/testData.json');

test.describe('Login Tests', () => {
  test('Successful login with valid user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.users[0].username, testData.users[0].password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('Login with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testData.users[1].username, testData.users[1].password);
    await expect(page.locator('h3[data-test="error"]')).toContainText('locked out');
  });

  test('Login with invalid credentials displays error message', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com');
  
    // Attempt to login with invalid credentials
    await page.fill('input[data-test="Username"]', 'invalid_user');
    await page.fill('input[data-test="password"]', 'invalid_password');
    await page.click('input[data-test="login-button"]');
  
    // Validate error message
    const errorMsg = await page.textContent('h3[data-test="error"]');
    expect(errorMsg).toBe('Epic sadface: Username and password do not match any user in this service');
  });
  
});
