import { FileChooser, Page } from 'playwright'
import { generate_random, random_timeout } from '../random.js'
import { readFile } from 'fs'
import { c_listing } from '../listing_class.js'

interface i_params {
  page: Page;
  listing: c_listing;
  price: string;
  type?: 'item' | 'vehicle' | 'rental';
  condition?: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
}

export const post_listing = async ({ page, price, listing, type='item', condition='Used - Fair' }: i_params) => {
  await page.goto(`https://www.facebook.com/marketplace/create/${type}`, {
    waitUntil: 'networkidle',
  });


  const file_chooser_promise = page.waitForEvent('filechooser');

  await random_timeout(page);
  page.locator('div[role="button"]:has-text("Add Photos")').click();

  const file_chooser = await file_chooser_promise;
  await file_chooser.setFiles('./dressertest.png');

  await random_timeout(page);
  page.locator('label[aria-label="Title"] input').fill(listing.get_title);

  await random_timeout(page);
  page.locator('label[aria-label="Price"] input').fill(price);

  await random_timeout(page);
	page.locator('label[aria-label="Category"] input').fill('Dressers');

  await random_timeout(page);
  page.keyboard.press('Enter');

  await random_timeout(page);
	page.locator('label[aria-label="Condition"]').click();

  await random_timeout(page);
  page.getByText(condition).click();



  await page.waitForTimeout(10000);
};