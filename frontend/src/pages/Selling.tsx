import ShrinkableContainer from '../components/ShrinkableContainer'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useEffect, useState } from 'react'
import Posts from '../components/Posts';
import { c_listing } from '../listing_class'

interface i_listings {
  img_url: string;
  title: string;
  description: string;
  condition: string;
  type: string;
}

const Selling = () => {
  const [listings, set_listings] = useState<i_listings[]>([]);

  
  useEffect(() => {
    const grab_listings = async () => {
      console.log('grabbing listings');
      const listings_ref = collection(db, 'listings');
      const listings = await getDocs(listings_ref);
      return listings.docs.map((val) => {
        return val.data();
      });
    };

    grab_listings().then((data) => {
      set_listings(data as i_listings[]);
    });
 }, []);

 
  
  // make it so when you post a listings in the dashboard it automatically navigates to here
  // would also be nice to have some kind of notication component for ux purposes like a box that is green
  // and displays it has been posted to market place. an X button to close it would be a nice touch
  
console.log('active listings: ' + listings);
  
  const listings_class: c_listing[] = listings.map((val) => {
    const list = new c_listing;
    list.set_title = val.title;
    list.set_img_url = val.img_url;
    return list
  });

  
  return (
    <>
      <ShrinkableContainer heading="Active Listings" class_name="generic-container" container_width={1200} min_browser_width_before_shrink={1500}>
        <Posts data={listings_class} on_click={() => {}} handle_update={() => {}} />
      </ShrinkableContainer>
    </>
  )
}

export default Selling