const { test } = require('@playwright/test');
const { POManager } = require('../pages/POmanager');

async function login(page) {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
}

test('Buzz - open buzz feed', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const buzzPage = poManager.getBuzzPage();

  await dashboardPage.navigateToModule('Buzz');
  await buzzPage.verifyPageHeader();
});

test('Buzz - open post composer', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const buzzPage = poManager.getBuzzPage();

  await dashboardPage.navigateToModule('Buzz');
  await buzzPage.openPostComposer();
});
