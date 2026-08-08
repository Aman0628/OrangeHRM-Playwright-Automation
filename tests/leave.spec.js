const { test } = require('@playwright/test');
const { POManager } = require('../pages/POmanager');

async function login(page) {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
}

test('Leave - open leave list', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const leavePage = poManager.getLeavePage();

  await dashboardPage.navigateToModule('Leave');
  await leavePage.verifyPageHeader();
});

test('Leave - open leave list filters', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const leavePage = poManager.getLeavePage();

  await dashboardPage.navigateToModule('Leave');
  await leavePage.openFilters();
});
