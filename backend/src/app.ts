import { chromium } from 'playwright'
import { login } from './helpers/fb_login.js'
import { post_listing } from './helpers/fb_post.js'

async function main() {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  
  
  await login(page);
  await post_listing({
    page,
  });

  await context.close();
  await browser.close();
};

main();