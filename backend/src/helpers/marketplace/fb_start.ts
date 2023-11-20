import { chromium } from 'playwright'
import { login } from './fb_login.js'
import { post_listing } from './fb_post.js'
import { c_listing } from '../listing_class.js'

export const fb_start = async (fb_email: string, fb_pass, price: string, type: string, condition: string, listing: c_listing) => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await login(page, fb_email, fb_pass);
  await post_listing({
    page: page, listing: listing, price: price, type: type, condition: condition
  });

  await context.close();
  await browser.close();
}