import { chromium } from 'playwright'
import { check_listings } from './finder.js'
import { c_listing } from '../listing_class.js'

export const cl_start = async (): Promise<c_listing[]> => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  const listings = await check_listings(page);

  await context.close();
  await browser.close();

  return listings;
};