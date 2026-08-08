const { expect } = require('@playwright/test');

class BuzzPage {
    constructor(page) {
        this.page = page;
        this.buzzFeed = page.locator('.oxd-layout-context');
        this.buzzComposer = page.locator('textarea').first();
        this.postButton = page.getByRole('button', { name: 'Post' }).first();
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/buzz/);
        await expect(this.buzzFeed).toBeVisible();
        await expect(this.buzzComposer).toBeVisible();
    }

    async openPostComposer() {
        await this.verifyPageHeader();
        await this.buzzComposer.click();
        await expect(this.postButton).toBeVisible();
    }
}

module.exports = { BuzzPage };
