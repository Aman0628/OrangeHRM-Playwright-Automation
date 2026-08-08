const { test } = require('@playwright/test');
const { POManager } = require('../pages/POmanager');

async function login(page) {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
}

test('PIM - open employee list', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const pimPage = poManager.getPIMPage();

  await dashboardPage.navigateToModule('PIM');
  await pimPage.verifyPageHeader();
});

test('PIM - open add employee form', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const pimPage = poManager.getPIMPage();

  await dashboardPage.navigateToModule('PIM');
  await pimPage.openAddEmployeeForm();
});

test('PIM - search employee by name', async ({ page }) => {
  await login(page);
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const pimPage = poManager.getPIMPage();

  await dashboardPage.navigateToModule('PIM');
  await pimPage.searchEmployee('Alice');
});
