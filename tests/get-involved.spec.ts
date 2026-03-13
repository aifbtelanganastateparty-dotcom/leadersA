import { test, expect } from '@playwright/test';

test.describe('Get Involved Page', () => {
  test('should validate and submit the report issue form successfully', async ({ page }) => {
    // Navigate to the specific hash route
    await page.goto('/#/get-involved');

    // Wait for the form to be visible (it's in the default active tab)
    await expect(page.locator('#report-issue-form')).toBeVisible();

    // 1. Test Validation Errors (Submit empty)
    await page.evaluate(() => {
      const reportForm = document.getElementById('report-issue-form') as HTMLFormElement | null;
      reportForm?.requestSubmit();
    });

    // Check for error messages
    await expect(page.locator('#error-name')).toHaveText('Please enter your full name');
    await expect(page.locator('#error-phone')).toHaveText('Phone number is required');
    await expect(page.locator('#error-issue')).toHaveText('Please describe the issue');

    // 2. Fill out the form with valid data
    await page.getByPlaceholder('Your Name').fill('Rahul Sharma');
    await page.getByPlaceholder('10-digit mobile number').fill('9876543210');
    await page
      .getByPlaceholder('Describe the civic issue...')
      .fill('There is a massive pothole on MG Road causing daily accidents.');

    // Wait for real-time validation to clear errors
    await expect(page.locator('#error-name')).toBeEmpty();

    // 3. Submit the form
    const submitBtn = page.locator('#report-issue-form button[type="submit"]');

    await page.evaluate(() => {
      const reportForm = document.getElementById('report-issue-form') as HTMLFormElement | null;
      reportForm?.requestSubmit();
    });

    // 4. Verify loading state
    await expect(submitBtn).toHaveText('Submitting...');
    await expect(submitBtn).toBeDisabled();

    // 5. Verify success state
    const successMsg = page.locator('#form-success');
    await expect(successMsg).toBeVisible({ timeout: 7000 });
    await expect(submitBtn).toHaveText('Submit Report'); // Text restores
    await expect(submitBtn).toBeEnabled();

    // 6. Verify form is reset
    await expect(page.getByPlaceholder('Your Name')).toBeEmpty();
  });
});
