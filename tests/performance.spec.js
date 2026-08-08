const { test } = require('@playwright/test');
const { POManager } = require('../pages/POmanager');

async function login(page) {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
}

test('Performance - open performance page', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const performancePage = poManager.getPerformancePage();

  await dashboardPage.navigateToModule('Performance');
  await performancePage.verifyPageHeader();
});

test('Performance - open employee reviews', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const performancePage = poManager.getPerformancePage();

  await dashboardPage.navigateToModule('Performance');
  await performancePage.openEmployeeReviews();
});
