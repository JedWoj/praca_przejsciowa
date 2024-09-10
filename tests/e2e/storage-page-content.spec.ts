import { test, expect } from '@playwright/test';
import { StoragePage } from '../pages/storage.page';

test.beforeEach(async ({page}) => {
    const storagePage = new StoragePage(page);
    await storagePage.navigate();
})

test.describe('Landing page content', () => {
    test('Check if storage page content is visible', async ({ page }) => {
        const storagePage = new StoragePage(page);
        const navigation = await storagePage.getNavigation();

        await expect(navigation).toBeVisible();
    });
})