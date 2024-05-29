import { expect, test } from '@playwright/test'

test('sing in successfully', async ({ page }) => {
    await page.goto('/sign-in', { waitUntil: 'networkidle' })

    await page.getByLabel('Your e-mail').fill('johndoe@example.com')

    await page.getByRole('button', { name: 'Access dashboard' }).click()

    const toast = page.getByText('We send an authentication link to your email.')
    expect(toast).toBeVisible()
})

test('sing in with wrong credentials', async ({ page }) => {
    await page.goto('/sign-in', { waitUntil: 'networkidle' })

    await page.getByLabel('Your e-mail').fill('wrong@example.com')

    await page.getByRole('button', { name: 'Access dashboard' }).click()

    const toast = page.getByText('Invalid credentials.')
    expect(toast).toBeVisible()
})

test('nevigate to new restaurant page', async ({ page }) => {
    await page.goto('/sign-in', { waitUntil: 'networkidle' })

    await page.getByRole('link', { name: 'New restaurant' }).click()

    expect(page.url()).toContain('/sign-up')
})