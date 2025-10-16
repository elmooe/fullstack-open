const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Elmo Erla',
        username: 'elmooe',
        password: 'password123'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = page.getByTestId('login-form')
    await expect(loginForm).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrongpassword')

      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Testi Blogi', 'Testi Kirjoittaja', 'https://esimerkki.com/testi-blogi')

      await expect(page.getByText('Testi Blogi Testi Kirjoittaja')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Tykättävä Blogi', 'Testi Kirjoittaja', 'https://esimerkki.com/tykättävä-blogi')

      const viewButton = page.getByRole('button', { name: 'view' })
      await viewButton.click()
      const likeButton = page.getByRole('button', { name: 'like' })
      await likeButton.click()
      const likes = page.getByText('likes')
      await expect(likes).toContainText('1')
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      await createBlog(page, 'Poistettava Blogi', 'Testi Kirjoittaja', 'https://esimerkki.com/poistettava-blogi')

      const viewButton = page.getByRole('button', { name: 'view' })
      await viewButton.click()

      page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Remove blog "Poistettava Blogi" by Testi Kirjoittaja')
        await dialog.accept()
      })

      const removeButton = page.getByRole('button', { name: 'remove' })
      await removeButton.click()

      await expect(page.getByText('Poistettava Blogi Testi Kirjoittaja')).not.toBeVisible()
    })

    test('only the creator can see the remove button', async ({ page }) => {
      await createBlog(page, 'Matin Blogi', 'Matti Luukkainen', 'https://esimerkki.com/matin-blogi')

      await page.getByRole('button', { name: 'logout' }).click()

      await loginWith(page, 'elmooe', 'password123')

      const viewButton = page.getByRole('button', { name: 'view' })
      await viewButton.click()

      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are ordered by likes with most liked first', async ({ page }) => {
      await createBlog(page, 'Vähiten tykätty', 'Kirjoittaja 1', 'https://esimerkki.com/vähiten')
      await createBlog(page, 'Eniten tykätty', 'Kirjoittaja 2', 'https://esimerkki.com/eniten')
      await createBlog(page, 'Keskellä oleva', 'Kirjoittaja 3', 'https://esimerkki.com/keskellä')

      await page.reload()

      let viewButtons = page.getByRole('button', { name: 'view' })
      await viewButtons.nth(1).click()
      for (let i = 0; i < 5; i++) {
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(100)
      }
      await page.getByRole('button', { name: 'hide' }).click()

      viewButtons = page.getByRole('button', { name: 'view' })
      await viewButtons.nth(2).click()
      for (let i = 0; i < 2; i++) {
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(100)
      }
      await page.getByRole('button', { name: 'hide' }).click()

      await page.reload()

      const blogElements = page.locator('.blog')
      await expect(blogElements.nth(0)).toContainText('Eniten tykätty')
      await expect(blogElements.nth(1)).toContainText('Keskellä oleva')
      await expect(blogElements.nth(2)).toContainText('Vähiten tykätty')
    })
  })
})