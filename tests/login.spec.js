const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POmanager');


test('P0 - valid login should open the dashboard', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
  await dashboardPage.verifyDashboardHeader();
});

test('P0 - invalid login should show an error message', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.navigate();
  await loginPage.login('Admin', 'wrongpassword');
  await loginPage.verifyInvalidCredentialsError();
});

test('P0 - logout should return to the login screen', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
  await dashboardPage.logout();
  await loginPage.verifyLoginPageVisible();
});

