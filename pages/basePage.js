import { expect } from "@playwright/test";

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async open(url) {
        return await this.page.goto(url)
    }

    async waitForPageLoad() {
        return await this.page.waitForLoadState('domcontentloaded')
    }

    async findAndFill(selector, text) {
        return await this.page.getByPlaceholder(selector).fill(text)
    }

    async findAndClick(selector) {
        return await this.page.getByRole('button', { name: selector }).click()
    }
}

export default BasePage;