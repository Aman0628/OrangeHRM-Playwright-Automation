const { test } = require('@playwright/test');
const { POManager } = require('../pages/POmanager');
const loginData = require('../test.data/login.json');

const DEFAULT_CREDENTIALS = { username: 'Admin', password: 'admin123' };

/**
 * Logs in once and returns a context/page/poManager trio. Exposed directly
 * in case a spec ever needs the pieces individually, but most spec files
 * should use `describeModule` below instead of calling this by hand.
 */
async function loginOnce(browser) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    const credentials = loginData.find(c => c.expected === 'success') || DEFAULT_CREDENTIALS;

    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);

    return { context, page, poManager };
}

/**
 * Wraps `test.describe` for a module's spec file so every test in the
 * block shares ONE authenticated session, logged in via `test.beforeAll`
 * instead of each test (or each file) re-implementing the same
 * login/context/cleanup boilerplate.
 *
 * Usage in a spec file:
 *
 *   const { test } = require('@playwright/test');
 *   const { describeModule } = require('../utils/moduleLogin');
 *
 *   describeModule('Admin module', (getPoManager) => {
 *     test('Admin - open User Management', async () => {
 *       const poManager = getPoManager();
 *       ...
 *     });
 *   });
 *
 * `getPoManager()` must be called from inside a test (or a beforeEach/
 * afterEach) — the POManager instance isn't ready until `beforeAll` runs.
 *
 * Note: sharing one page across tests requires serial mode within the
 * describe block (tests run one after another, not in parallel). Other
 * spec files still run in parallel against each other as normal.
 */
function describeModule(title, defineTests) {
    test.describe(title, () => {
        test.describe.configure({ mode: 'serial' });

        let context;
        let poManager;

        test.beforeAll(async ({ browser }) => {
            ({ context, poManager } = await loginOnce(browser));
        });

        test.afterAll(async () => {
            // If beforeAll itself timed out (e.g. the demo site was slow
            // under load), context may never have been assigned — guard so
            // that failure doesn't get masked by a second, unrelated error.
            if (context) {
                await context.close();
            }
        });

        defineTests(() => poManager);
    });
}

module.exports = { loginOnce, describeModule };
