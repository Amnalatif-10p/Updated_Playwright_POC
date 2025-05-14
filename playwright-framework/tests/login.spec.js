const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const testData = require('../data/testData.json');
const routes = require('../config/routes');

test.describe('Login Tests', () => {
  test('Successful login with valid user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(routes.loginPage);
    await loginPage.login(
      testData.users.standardUser.username,
      testData.users.standardUser.password
    );
    await expect(page).toHaveURL(routes.inventoryPage);
  });

  test('Login with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(routes.loginPage);
    await loginPage.login(
      testData.users.lockedOutUser.username,
      testData.users.lockedOutUser.password
    );
    await expect(page.locator('h3[data-test="error"]')).toContainText('locked out');
  });

  test('Login with invalid credentials displays error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(routes.loginPage);
    await loginPage.login('invalid_user', 'invalid_password');
    const errorMsg = await page.textContent('h3[data-test="error"]');
    expect(errorMsg).toBe(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});
