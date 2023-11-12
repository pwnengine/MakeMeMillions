import { chromium } from 'playwright'
import { login } from './fb_login.js'
import { post_listing } from './fb_post.js'

export const fb_start = async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await login(page);
  await post_listing({
    page,
  });

  await context.close();
  await browser.close();
}