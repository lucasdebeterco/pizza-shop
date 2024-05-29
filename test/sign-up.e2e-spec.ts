import { expect, test } from '@playwright/test'

test('sing up successfully', async ({ page }) => {
    await page.goto('/sign-up', { waitUntil: 'networkidle' })

    await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
    await page.getByLabel('Seu nome').fill('John Doe')
    await page.getByLabel('Seu celular').fill('4567445674756')
    await page.getByLabel('Seu e-mail').fill('johndoe@example.com')

    await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

    const toast = page.getByText('Restaurante cadastrado com sucesso!')
    expect(toast).toBeVisible()
})

test('sing up with error', async ({ page }) => {
    await page.goto('/sign-up', { waitUntil: 'networkidle' })

    await page.getByLabel('Nome do estabelecimento').fill('Invalid Name')
    await page.getByLabel('Seu nome').fill('John Doe')
    await page.getByLabel('Seu celular').fill('4567445674756')
    await page.getByLabel('Seu e-mail').fill('johndoe@example.com')

    await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

    const toast = page.getByText('Erro ao cadastrar restaurante.')
    expect(toast).toBeVisible()
})

test('nevigate to login page', async ({ page }) => {
    await page.goto('/sign-up', { waitUntil: 'networkidle' })

    await page.getByRole('link', { name: 'Fazer login' }).click()

    expect(page.url()).toContain('/sign-in')
})