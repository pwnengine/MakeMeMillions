import { FileChooser, Page } from 'playwright'
import { generate_random, random_timeout, random_string } from '../random.js'
import { readFile } from 'fs'
import { c_listing } from '../listing_class.js'
import http from 'https'
import fs from 'fs'

interface i_params {
  page: Page;
  listing: c_listing;
  price: string;
  type: string;
  condition?: string;
}

const img_dl = (img_url: string): string => {
  const dest: string = random_string(10) + '.png';
  const file: fs.WriteStream = fs.createWriteStream(dest);
  const req = http.get(img_url, (res) => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
    });
  }).on('error', (err) => {
    fs.unlink(dest, (err) => console.log(err));
  });

  return dest;
};

export const post_listing = async ({ page, price, listing, type='item', condition="Used - Good"}: i_params) => {
  const img_file: string = img_dl(listing.get_img_url);

  await page.goto(`https://www.facebook.com/marketplace/create/$item`, {
    waitUntil: 'networkidle',
  });

  const file_chooser_promise = page.waitForEvent('filechooser');

  await random_timeout(page);
  page.locator('div[role="button"]:has-text("Add Photos")').click();

  const file_chooser = await file_chooser_promise;
  await file_chooser.setFiles(`./${img_file}`);

  await random_timeout(page);
  page.locator('label[aria-label="Title"] input').fill(listing.get_title);

  await random_timeout(page);
  page.locator('label[aria-label="Price"] input').fill(price);

  await random_timeout(page);
	page.locator('label[aria-label="Category"] input').fill(type);

  await random_timeout(page);
  page.keyboard.press('ArrowDown');
  await random_timeout(page);
  page.keyboard.press('Enter');


  await random_timeout(page);
	page.locator('label[aria-label="Condition"]').click();

  await random_timeout(page);
  page.getByText(condition).click();

  await random_timeout(page);
  page.locator('textarea').fill(listing.get_description);
  console.log('we are about to click next');
  await random_timeout(page);
  page.getByText('Next').click();

  console.log('waiting for new url');
  await page.waitForNavigation({
    timeout: 5000,
    url: 'https://www.facebook.com/marketplace/create/item/?step=audience',
    waitUntil: 'load',
  });

  console.log('we made it to the new url');

  await random_timeout(page);
  page.locator('div[aria-label="Publish"]').click();;

  await page.waitForNavigation({
    timeout: 5000,
    url: 'https://www.facebook.com/marketplace/you/selling',
    waitUntil: 'load',
  });

  fs.unlink(img_file, (err) => {
    console.log(err);
  });

  await page.waitForTimeout(10000);
};