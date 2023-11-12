import { chromium } from 'playwright'
import { check_listings } from './finder.js'

export const cl_start = async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await check_listings(page);

  await context.close();
  await browser.close();
};