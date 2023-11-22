import { Page } from 'playwright'
import { random_timeout } from '../random.js'
import { ChatGPTAPI } from 'chatgpt'
import { c_listing } from '../listing_class.js'

export const check_listings = async (page: Page): Promise<c_listing[]> => {
  /*
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });
*/
  const listings: c_listing[] = [];

  await page.goto(`${process.env.cl_url}search/zip#search=1~gallery~0~0`, {
    waitUntil: 'networkidle',
  });

  // now we got all of the first page listing (120 total)
  await random_timeout(page);
  const elements_cnt = (await page.$$('.cl-gallery')).length;

  // should probably only check half of the total
  for(let q: number = 0; q < (elements_cnt - 100); ++q) {
    let img_url: string;
    let title: string;
    let description: string;


    // get all of the listings
    const elements = await page.$$('.cl-gallery');

    // try to click on a listing
    try {
      await elements[q].click();
    } catch(err) {
      console.log('error clicking on listing: ' + err);
    }

    // try to get listing image url
    try {
      const img_tag_outer = await page.$('.slide');
      const img_tag_inner = await img_tag_outer.innerHTML()
      img_url = img_tag_inner.split('"')[1];
    } catch(err) {
      console.log('error gettings image url inside of listing: ' + err);

      await page.goto(`${process.env.cl_url}search/zip#search=1~gallery~0~0`, {
        waitUntil: 'networkidle',
      });
      continue; // because I only want the posts with images
    }

    // try to get listing title
    try {
      title = await page.locator('span[id=titletextonly]').innerText();
    } catch(err) {
      console.log('error locating listing title: ' + err);
    }

    // try to get listing description
    try {
      description = await page.locator('section[id="postingbody"]').innerText();
    } catch(err) {
      console.log('error locating description: ' + err);
    }

    // go back to main page to reset
    await page.goto(`${process.env.cl_url}search/zip#search=1~gallery~0~0`, {
      waitUntil: 'networkidle',
    });

    const tmp_listing = new c_listing;
    tmp_listing.set_img_url = img_url;
    tmp_listing.set_title = title;
    tmp_listing.set_description = description;

    listings.push(tmp_listing);
  }

  return listings;
};