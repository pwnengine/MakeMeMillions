# MakeMeMillions

Have you been watching too much Gary Vee and want to get rich making craigslist flips?
Well, I have... but what does one do when they're a socially awkward programmer that's scared to go outside?
Maybe make a craigslist scraper that does the work for you and auto-facebook-poster mix them together and now you know how this project started.

## Why?
- IDEK :)
- Because I was bored.

![image](https://github.com/user-attachments/assets/ec7302bb-bef3-4fae-b980-0d2ee938bad3)
![image](https://github.com/user-attachments/assets/dc304189-3bab-465b-80fd-e4c14cd38102)

## Usuage
This project is technically useful and I was able to make a little over 1k dollars until I got bored.
If you want to give craigslist flipping a try this is an automated tool to get you going.

1. First clone the repo
```git clone https://github.com/pwnengine/MakeMeMillions.git```

2. Install
```cd frontend && npm i```
```cd backend && npm i```

This project uses playwright for scraping and posting to facebook market place.
```cd backend && npx i playwright```

3. Create ```.env``` files
Create a ```.env``` file inside of the frontend directory as well as the backend directory.
Inside of the frontend you need to put your facebook accounts email and password. This never gets sent anywhere it's just used so playwright can log in for you.
The file should look like this:
```
VITE_FB_EMAIL=youremail
VITE_FB_PASS=yourpassword
```
Next, create one for the backend that has the link to your craiglist location:
```CL_URL=https://cleveland.craigslist.org/```

Now you have two ```.env``` files one in your backend to tell playwright what craigslist location to scrape.
And one to tell it what account to login to on facebook to post the craigslist item.

4. Running
Open a terminal in the frontend directory and run ```npm run dev```
Open another terminal in the backend directory and do the same.

