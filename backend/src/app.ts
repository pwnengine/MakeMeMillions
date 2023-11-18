import { fb_start } from './helpers/marketplace/fb_start.js'
import express from 'express'
import { config } from 'dotenv'
import { cl_start } from './helpers/craigslist/cl_start.js'
import { c_listing } from './helpers/listing_class.js'

config();

let cl_listings: c_listing[] = await cl_start();

// on interval let's check craiglist for good free stuff
setInterval(async () => {
  cl_listings = await cl_start();
}, 60000); // run bot about every 2 days 147483647

function main() {
  const app = express();

  app.get('/api/v1/cl/', async (req, res) => {
    if(req.query.check === 'true') {
      cl_listings = await cl_start();
    }
    console.log(req.query);
    res.json({
      listings_length: cl_listings.length,
      listings: cl_listings.map((val) => val),
    });
  });

  app.get('/api/v1/fb/', (req, res) => {
    const query = req.query;
    fb_start(query.email, query.pass, query.price, cl_listings[query.index]);
    res.json({
      listing: {
        img_url: cl_listings[query.listing].get_img_url,
        title: cl_listings[query.listing].get_title,
        description: cl_listings[query.listing].get_description,
      },
    });

  });

  app.listen(8080, () => {
    console.log('running backend on port 8080');
  });
}
main();