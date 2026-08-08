const { test } = require('@playwright/test');
const { describeModule } = require('../utils/moduleLogin');
const employeeData = require('../test.data/employee.json');

describeModule('PIM module', (getPoManager) => {
  test('PIM - open employee list', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const pimPage = poManager.getPIMPage();

    await dashboardPage.navigateToModule('PIM');
    await pimPage.verifyPageHeader();
  });

  test('PIM - open add employee form loads the create-employee page', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const pimPage = poManager.getPIMPage();

    await dashboardPage.navigateToModule('PIM');
    await pimPage.openAddEmployeeForm();
  });

  test('PIM - search employee by name returns matching results', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const pimPage = poManager.getPIMPage();

    await dashboardPage.navigateToModule('PIM');
    await pimPage.searchEmployee('Alice');
  });

  test('PIM - search for a non-existent employee shows no records', async () => {
    const poManager = getPoManager();
    const dashboardPage = poManager.getDashboardPage();
    const pimPage = poManager.getPIMPage();

    await dashboardPage.navigateToModule('PIM');
    await pimPage.searchEmployee('Zzznobody_999');
  });

  for (const emp of employeeData) {
    test(`PIM - add employee (${emp.testCase})`, async () => {
      const poManager = getPoManager();
      const dashboardPage = poManager.getDashboardPage();
      const pimPage = poManager.getPIMPage();

      await dashboardPage.navigateToModule('PIM');
      await pimPage.addEmployee(emp);

      await dashboardPage.navigateToModule('PIM');
      await pimPage.searchEmployee(emp.firstName);
    });
  }
});
