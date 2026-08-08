const { expect } = require('@playwright/test');

class RecruitmentPage {
    constructor(page) {
        this.page = page;
        this.candidatesHeader = page.getByRole('heading', { name: 'Candidates' });
        this.recruitmentTable = page.locator('.oxd-table-filter');
        this.addButton = page.getByRole('button', { name: 'Add' });
    }

    async verifyPageHeader() {
        await expect(this.page).toHaveURL(/\/recruitment\/viewCandidates/);
        await expect(this.candidatesHeader).toBeVisible();
        await expect(this.recruitmentTable).toBeVisible();
    }

    async openAddCandidateForm() {
        await this.verifyPageHeader();
        await this.addButton.click();
    }
}

module.exports = { RecruitmentPage };