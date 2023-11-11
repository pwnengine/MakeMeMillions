import { chromium } from 'playwright'
import { login } from './helpers/login.js'

async function main() {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  
  
  await login(page);
  

  await context.close();
  await browser.close();
};

main();