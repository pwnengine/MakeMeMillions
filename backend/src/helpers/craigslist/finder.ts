import { Page } from 'playwright'
import { random_timeout } from '../random.js'
import { ChatGPTAPI } from 'chatgpt'

export const check_listings = async (page: Page) => {
  /*
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  });
*/
  await page.goto(`${process.env.cl_url}search/zip#search=1~gallery~0~0`, {
    waitUntil: 'networkidle',
  });

  // now we got all of the first page listing (120 total)
  const elements = await page.$$('.cl-gallery');

  // should probably only check half of the total
  for(let q: number = 0; q < ((elements.length - 110) - 1); ++q) {
    //const inner_a_element = await elements[q].$('.main');
    //console.log(await inner_a_element.innerHTML());

    const inner_elements = await elements[q].$('.main');
    const inner_elements_inner = await inner_elements.innerHTML();
    const inner_tags_array = inner_elements_inner.split('>');
    //console.log(imgs_array);

    if(inner_tags_array != undefined) {
      for(let qq: number = 0; qq < inner_tags_array.length - 1; ++qq) {
        //console.log(inner_tags_array[qq]);

  


        if(inner_tags_array[qq].includes('img')) {
          //console.log('this is an img tag: ' + inner_tags_array[qq]);

          const img_tags = inner_tags_array[qq].split('"');

          const alt = img_tags[1];
          const img = img_tags[3];

          if(alt != undefined && img != undefined) {
            console.log('alt: ' + alt);
            console.log('img: ' + img);
          }
          
          
          
          //const res = await api.sendMessage()
        }
      }
    }
    

  }

  console.log(elements.length);
};