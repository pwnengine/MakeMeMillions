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
}, 147483647); // run bot about every 2 days 147483647

function main() {
  const app = express();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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
    console.log(query);
    const listing_to_post = new c_listing;
    listing_to_post.set_img_url = query.img_url;
    listing_to_post.set_title = query.item_title;
    listing_to_post.set_description = query.item_description;

    fb_start(query.email, query.pass, query.item_price, query.item_condition, query.item_type, listing_to_post).then(() => {
      res.json({
        hello: 'hello',
      });
    });    
  });

  app.listen(8080, () => {
    console.log('running backend on port 8080');
  });
}
main();