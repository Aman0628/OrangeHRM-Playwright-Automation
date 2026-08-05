const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POmanager');


test('Login Test ', async ({ page }) => {

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();

  await loginPage.navigate();
  await loginPage.validLogin('Admin', 'admin123');


  await dashboardPage.verifyDashboardHeader();
});

