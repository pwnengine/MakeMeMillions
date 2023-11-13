import { Page } from 'playwright'
import { random_timeout } from '../random.js'
import { ChatGPTAPI } from 'chatgpt'
import { c_listings } from '../listing_class.js'

export const check_listings = async (page: Page) => {
  /*
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });
*/
  const listings = new c_listings;

  //const img_urls = [];
  //const titles = [];
  //const descriptions = [];

  await page.goto(`${process.env.cl_url}search/zip#search=1~gallery~0~0`, {
    waitUntil: 'networkidle',
  });

  // now we got all of the first page listing (120 total)
  await random_timeout(page);
  const elements_cnt = (await page.$$('.cl-gallery')).length;

  // should probably only check half of the total
  for(let q: number = 0; q < (elements_cnt - 110); ++q) {
    await random_timeout(page);
    const elements = await page.$$('.cl-gallery');

    try {
      await random_timeout(page);
      await elements[q].click();

      //await random_timeout(page);
      const img_tag_outer = await page.$('.slide');
      const img_tag_inner = await img_tag_outer.innerHTML()
      //img_urls.push(img_tag_inner.split('"')[1]);
      listings.add_img_url = img_tag_inner.split('"')[1];

      //await random_timeout(page);
      //titles.push(await page.locator('span[id="titletextonly"]').innerText());
      listings.add_title = await page.locator('span[id=titletextonly]').innerText();

      await random_timeout(page);
      //descriptions.push(await page.locator('section[id="postingbody"]').innerText());
      listings.add_description = await page.locator('section[id="postingbody"]').innerText();

      await page.goto(`${process.env.cl_url}search/zip#search=1~gallery~0~0`, {
        waitUntil: 'networkidle',
      });
    } catch(err) {
      console.log(err);
    }
  }

  console.log(listings.get_img_urls);
  console.log(listings.get_titles);
  console.log(listings.get_descriptions);

  return listings;
};