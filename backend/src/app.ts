import { fb_start } from './helpers/marketplace/fb_start.js'
import express from 'express'
import { config } from 'dotenv'
import { cl_start } from './helpers/craigslist/cl_start.js'

config();

// on interval let's check craiglist for good free stuff
cl_start();
setInterval(() => {
  cl_start();
}, 147483647); // run bot about every 2 days

/*
const app = express();

app.get('/api', (req, res) => {

  check++;

  res.json({
    yo: 'hello',
  });
});

app.listen(8080, () => {
  console.log('running on port 8080');
});

*/