import { test, expect } from '@playwright/test';

test('loads the home page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Leaders for India/i);
  await expect(page.getByRole('heading', { name: /Redefining Leadership/i })).toBeVisible();
});

test('navigates to Get Involved from the home CTA', async ({ page }) => {
  await page.goto('/');
  await page
    .locator('section.hero')
    .getByRole('link', { name: /Report an Issue/i })
    .click();
  await expect(page).toHaveURL(/#\/get-involved/i);
  await expect(page.locator('#report-issue-form')).toBeVisible();
});
