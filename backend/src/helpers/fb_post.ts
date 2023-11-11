import { Page } from 'playwright'
import { generate_random } from './random.js'

interface i_params {
  page: Page;
  type?: 'item' | 'vehicle' | 'rental';
  condition?: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
}

export const post_listing = async ({ page, type='item', condition='Used - Fair' }: i_params) => {
  await page.goto(`https://www.facebook.com/marketplace/create/${type}`, {
    waitUntil: 'networkidle',
  });

  await page.waitForTimeout(generate_random(3000, 5000));
  page.locator('label[aria-label="Title"] input').fill('some title');

  await page.waitForTimeout(generate_random(3000, 5000));
  page.locator('label[aria-label="Price"] input').fill('420');

  await page.waitForTimeout(generate_random(3000, 5000));
	page.locator('label[aria-label="Category"] input').fill('Antique & Collectible Stamps');

  await page.waitForTimeout(generate_random(3000, 5000));
  page.keyboard.press('Enter');

  await page.waitForTimeout(generate_random(3000, 5000));
	page.locator('label[aria-label="Condition"]').click();

  await page.waitForTimeout(generate_random(3000, 5000));
  page.getByText(condition).click();



  await page.waitForTimeout(10000);
};