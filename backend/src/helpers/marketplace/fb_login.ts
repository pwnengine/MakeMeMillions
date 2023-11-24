import { Locator, Page } from 'playwright'
import { generate_random, random_timeout } from '../random.js'

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
    await page.locator('css=div[id="error_box"]').waitFor({
      state: 'attached', 
      timeout: 10000,
    });  
  } catch(err) {
    return false;
  }
  
  return true;
};

export const login = async (page: Page, fb_email: string, fb_pass: string): Promise<number> => {
  await page.goto('https://www.facebook.com/', { waitUntil: 'networkidle' });

  await random_timeout(page);
  const email = page.getByPlaceholder('Email or phone number');
  await email.fill(fb_email);

  await random_timeout(page);
  const pass = page.getByPlaceholder('Password');
  await pass.fill(fb_pass);

  await random_timeout(page);
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
    console.log('why null');
    return 1;
  } else {
    console.log('not null');
    return 0;
  }
};