import { Locator, Page } from 'playwright'
import { generate_random } from './random.js'
import { config } from 'dotenv'

const captcha_detection = async (page: Page): Promise<boolean> => {
  try {
    await page.locator('id=captcha_container').waitFor({
      state: 'visible',
      timeout: 10000,
    });
  } catch(err) {
    return false;
  }

  return true;
};

const error_detection = async (page: Page): Promise<boolean> => {
  try {
    await page.locator("css=div[id='error_box']").waitFor({
      state: 'attached', 
      timeout: 10000,
    });  
  } catch(err) {
    return false;
  }
  
  return true;
};

export const login = async (page: Page): Promise<number> => {
  await page.goto('https://www.facebook.com/', { waitUntil: 'networkidle' });

  config();

  await page.waitForTimeout(generate_random(3000, 5000));
  const email = page.getByPlaceholder('Email or phone number');
  await email.fill(`${process.env.AUTH_EMAIL}`);

  await page.waitForTimeout(generate_random(3000, 5000));
  const pass = page.getByPlaceholder('Password');
  await pass.fill(`${process.env.AUTH_PASS}`);

  page.waitForTimeout(generate_random(3000, 5000));
  page.locator("css=button[name='login']").click();

  if(captcha_detection(page)) {
    const captcha_locator = page.locator('id=captcha_container');
    
    await captcha_locator.waitFor({
      state: 'hidden',
      timeout: 60000,
    });
  }

 // if(error_detection(page)) {
 //   console.log(`ERROR: ${page.locator("css=div[id='error_box']").innerText()}`);
 // }


  let post_locator: Locator | null = null;
  post_locator = page.locator('css=span', { 
    hasText: "What's on your Mind",
  });

  await post_locator.waitFor({
    state: 'attached',
    timeout: 5000,
  });

  if(post_locator == null) {
    console.log('null');
    return 1;
  } else {
    console.log('not null');
    return 0;
  }
};