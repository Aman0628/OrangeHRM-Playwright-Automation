const { test } = require('@playwright/test');
const { POManager } = require('../pages/POmanager');

async function login(page) {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
}

test('My Info - open personal details', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const myInfoPage = poManager.getMyInfoPage();

  await dashboardPage.navigateToModule('My Info');
  await myInfoPage.verifyPageHeader();
});

test('My Info - open attachments tab', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const myInfoPage = poManager.getMyInfoPage();

  await dashboardPage.navigateToModule('My Info');
  await myInfoPage.openAttachmentsTab();
});
