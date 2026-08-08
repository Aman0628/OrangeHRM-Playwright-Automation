const base = require('@playwright/test');
const { POManager } = require('../pages/POmanager');
const loginData = require('../test.data/login.json');

/**
 * Extends Playwright's base `test` with:
 *  - `poManager`: a POManager already bound to the test's `page`
 *  - `authenticatedPage`: a page that is already logged in as Admin
 *
 * This replaces the `login(page)` helper that was copy-pasted into
 * every spec file. Usage in a spec:
 *
 *   const { test, expect } = require('../fixtures/authFixture');
 *
 *   test('example', async ({ authenticatedPage, poManager }) => {
 *     const dashboardPage = poManager.getDashboardPage();
 *     ...
 *   });
 */
const test = base.test.extend({
    poManager: async ({ page }, use) => {
        await use(new POManager(page));
    },

    authenticatedPage: async ({ page }, use) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();

        // Reuse the first valid credential set from test.data/login.json,
        // falling back to the known demo credentials if the file is empty.
        const credentials = loginData.find(c => c.expected === 'success') || {
            username: 'Admin',
            password: 'admin123',
        };

        await loginPage.navigate();
        await loginPage.login(credentials.username, credentials.password);

        await use(page);
    },
});

module.exports = { test, expect: base.expect };
