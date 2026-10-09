import { expect, test, Locator, Page } from '@playwright/test';
export class OrdersHistoryPage {

    ordersTable: Locator;
    rows: Locator;
    orderdIdDetails: Locator;
    page: Page;
    constructor(page: Page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderId: String) {

        await this.ordersTable.waitFor();
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderIdText = await this.rows.nth(i).locator("th").textContent() ?? '';
            if (orderId.includes(rowOrderIdText)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async getOrderId() {
        return await this.orderdIdDetails.textContent();
    }

}

