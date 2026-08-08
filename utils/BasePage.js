const { expect } = require('@playwright/test');

/**
 * BasePage holds behaviour shared by every page object:
 * common waits, generic header/URL assertions, and small
 * utilities so individual page objects don't repeat them.
 *
 * Existing page objects (LoginPage, DashboardPage, etc.) can
 * extend this class incrementally — it is safe to introduce
 * without touching them, since none currently extend anything.
 */
class BasePage {
    constructor(page) {
        this.page = page;
    }

    /** Wait until the URL matches the given pattern. */
    async waitForUrl(pattern, options = {}) {
        await this.page.waitForURL(pattern, options);
    }

    /** Assert the current URL matches a pattern (string or RegExp). */
    async verifyUrl(pattern) {
        await expect(this.page).toHaveURL(pattern);
    }

    /** Assert a locator is visible, with a friendlier failure message. */
    async verifyVisible(locator, name = 'element') {
        await expect(locator, `${name} should be visible`).toBeVisible();
    }

    /** Wait for the OrangeHRM loading spinner to disappear, if present. */
    async waitForLoadingToFinish() {
        const spinner = this.page.locator('.oxd-loading-spinner');
        if (await spinner.count()) {
            await spinner.first().waitFor({ state: 'detached' }).catch(() => {});
        }
    }

    /** Assert a toast/notification message becomes visible with given text. */
    async verifyToastMessage(text) {
        const toast = this.page.locator('.oxd-toast-content', { hasText: text });
        await expect(toast).toBeVisible();
    }
}

module.exports = { BasePage };
