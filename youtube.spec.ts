import { test, expect } from '@playwright/test';

test.describe('YouTube Automation Tests', () => {

    test('Verify YouTube homepage title', async ({ page }) => {
        await page.goto('https://www.youtube.com/');
        await expect(page).toHaveTitle(/YouTube/);
    });

    test('Search for a video and verify results', async ({ page }) => {
        await page.goto('https://www.youtube.com/');


        const searchInput = page.locator('.ytSearchboxComponentInput.yt-searchbox-input.title');
        await expect(searchInput).toBeVisible();

        await searchInput.fill('Sor Daniel é o melhor');
        await searchInput.press('Enter');

        const results = page.locator('ytd-video-renderer');
        await results.first().waitFor();
        await expect(results.first()).toBeVisible();
    });

    test('Play a video from search results', async ({ page }) => {
        await page.goto('https://www.youtube.com/');


        const searchInput = page.locator('.ytSearchboxComponentInput.yt-searchbox-input.title');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('Playwright tutorial');
        await searchInput.press('Enter');


        const firstVideo = page.locator('ytd-video-renderer').first();
        await firstVideo.waitFor();
        await firstVideo.click();

        const videoPlayer = page.locator('#movie_player');
        await expect(videoPlayer).toBeVisible();
    });

});
