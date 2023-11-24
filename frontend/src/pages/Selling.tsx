import ShrinkableContainer from '../components/ShrinkableContainer'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useCallback, useEffect, useState } from 'react'

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
  
console.log(listings);

  return (
    <>
      <ShrinkableContainer heading="Active Listings" class_name="generic-container" container_width={1200} min_browser_width_before_shrink={1500}>
        <div>
          {listings.map((val) => {
            return (
              <div>
                <p>{val.title}</p>
              </div>
            )
          })}
        </div>
      </ShrinkableContainer>
    </>
  )
}

export default Selling