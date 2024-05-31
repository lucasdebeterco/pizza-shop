import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    await page.getByRole('button', { name: 'Pizza Shop' }).click()
    await page.getByRole('menuitem', { name: 'Store profile' }).click()

    await page.getByLabel('Name').fill('Rocket Pizza')
    await page.getByLabel('Description').fill('Another description')
    
    await page.getByRole('button', { name: 'Save' }).click()

    await page.waitForLoadState('networkidle')

    const toast = page.getByText('Profile updated successfully!')
    await expect(toast).toBeVisible()

    await page.getByRole('button', { name: 'Close' }).click()

    await expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()
})