const { test } = require('@playwright/test');
const { POManager } = require('../pages/POmanager');

async function login(page) {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
}

test('Admin - open User Management', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const adminPage = poManager.getAdminPage();

  await dashboardPage.navigateToModule('Admin');
  await adminPage.verifyPageHeader();
});

test('Admin - search for a system user', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const adminPage = poManager.getAdminPage();

  await dashboardPage.navigateToModule('Admin');
  await adminPage.searchUser('Admin');
});

test('Admin - open add user form', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const adminPage = poManager.getAdminPage();

  await dashboardPage.navigateToModule('Admin');
  await adminPage.openAddUserForm();
});
