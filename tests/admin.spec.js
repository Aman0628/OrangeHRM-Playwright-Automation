const { test } = require('@playwright/test');
const { describeModule } = require('../utils/moduleLogin');

describeModule('Admin module', (getPoManager) => {
  test('Admin - open User Management', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const adminPage = poManager.getAdminPage();

    await dashboardPage.navigateToModule('Admin');
    await adminPage.verifyPageHeader();
  });

  test('Admin - search for a system user returns matching results', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const adminPage = poManager.getAdminPage();

    await dashboardPage.navigateToModule('Admin');
    await adminPage.searchUser('Admin');
  });

  test('Admin - search for a non-existent user shows no records', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const adminPage = poManager.getAdminPage();

    await dashboardPage.navigateToModule('Admin');
    await adminPage.searchUser('NoSuchUser_zzz999');
  });

  test('Admin - open add user form loads the create-user page', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const adminPage = poManager.getAdminPage();

    await dashboardPage.navigateToModule('Admin');
    await adminPage.openAddUserForm();
  });
});
