import Posts from '../components/Posts';
import ShrinkableContainer from '../components/ShrinkableContainer';
import { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { c_listing } from '../listing_class';
import { useQueryHook } from '../hooks/useQueryHook'
import Axios from 'axios'

interface i_listings {
  img_url: string;
  title: string;
  description: string;
}

interface i_cl_query_data {
  listings_length: number;
  listings: i_listings[];
}

const Dashboard = () => {
  const [ curr_img_url, set_curr_img_url ] = useState<string>('');
  const [ curr_title, set_curr_title ] = useState<string>('');
  const [ curr_description, set_curr_description ] = useState<string>('');
  const [ curr_price, set_curr_price ] = useState<string>('');
  const [ update_item_values, set_update_item_values ] = useState<boolean>(false);
  const [ post_index, set_post_index ] = useState<number | null>(null);

  const [ fb_email, set_fb_email ] = useState<string>(import.meta.env.VITE_FB_EMAIL);
  const [ fb_pass, set_fb_pass ] = useState<string>(import.meta.env.VITE_FB_PASS);

  const { handleSubmit, register } = useForm();
  
  const [data, isLoading, refetch] = useQueryHook<i_cl_query_data>('http://localhost:8080/api/v1/cl/');
  if(isLoading) {
    return (
      <h2 style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-40%, -50%)'}}>Loading... <br/> We are gathering cragislist posts for you,<br/> please be patient.</h2>
    )
  }

  const listings: c_listing[] = []; 

  for(let q: number = 0; q < data.listings_length; ++q) {
    const listing: c_listing = new c_listing;
    listing.set_img_url = data.listings[q].img_url;
    listing.set_title = data.listings[q].title;
    listing.set_description = data.listings[q].description;
  
    listings.push(listing);
  }

  const handle_post = (data: FieldValues) => {
    const item_title = data['item-title'];
    const item_description = data['item-description'];
    const item_type = data['item-type'];
    const item_condition = data['item-condition'];
    const item_price = data['item-price'];

    Axios.get(`http://localhost:8080/api/v1/fb/?email=${fb_email}&pass=${fb_pass}&index=${post_index}&img_url=${curr_img_url}&item_title=${item_title}&item_description=${item_description}&item_type=${item_type}&item_condition=${item_condition}&item_price=${item_price}`).then((res) => console.log(res))
    .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="marketplace-post-container-outer">
        <h3 style={{marginLeft: '20px'}}>List With Marketplace</h3>
        
        

        <div className="marketplace-post-container-inner">
          
          <img width={250} height={250} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogodownload.org%2Fwp-content%2Fuploads%2F2014%2F09%2Ffacebook-logo-0.png&f=1&nofb=1&ipt=91a441588c41a8fb50724293d74a893da2b82423a7be653c16fb7816597464b9&ipo=images" />

          <form onSubmit={handleSubmit(handle_post)}>
            
            <div className="marketplace-post-img-container">
              <img className="marketplace-post-img" width={200} height={175} src={curr_img_url} />
              <select className="marketplace-post-type" {...register('item-type')}>
                <option value="Video Game Consoles">Video Game Consoles</option>
                <option value="Cell Phones">Cell Phones</option>
                <option value="Other Cell Phones & Accessories">Other Cell Phones & Accessories</option>
                <option value="Cables & Power Cords">Cables & Power Cords</option>
                <option value="Desktop Computers">Desktop Computers</option>
                <option value="Laptops">Laptops</option>
                <option value="Laptop Parts & Accessories">Laptop Parts & Accessories</option>
                <option value="Antique & Collectible Toys">Antique & Collectible Toys</option>
                <option>Antique & Collectible Stamps</option>
                <option>Beds & Bed Frames</option>
                <option>Benches</option>
                <option>Coffee Tables</option>
                <option>Dressers</option>
                <option>Mattresses</option>
                <option>Sofas, Loveseats & Sectional</option>
                <option>TV Stands & Entertainment Centers</option>
                <option>Miscellaneous</option>
              </select>

              <select className="marketplace-post-condition" {...register('item-condition')}>
                <option value="New">New</option>
                <option value="Used - Like New">Used - Like New</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Used - Fair">Used - Fair</option>
              </select>

              <label className="marketplace-post-price">Price: <b>${curr_price}</b> <input type="range" min="1" max="1000" {...register('item-price')} onChange={(e) => set_curr_price(e.target.value)} /></label>
              
            </div>
            <input className="marketplace-post-input" placeholder="Title" value={ update_item_values === true ? `${curr_title} [DEFAULT TITLE]` : undefined } {...register('item-title')} />
            <textarea className="marketplace-post-input-large" placeholder="Description" value={ update_item_values === true ? `${curr_description} [DEFAULT DESCRIPTION]` : undefined } {...register('item-description')} />
            <button type="submit" className="post-listing">Post</button>  

          </form>
        </div>
      </div>

      <ShrinkableContainer heading="Free Craigslist Listings" class_name="craigslist-posts-container">
        <Posts handle_update={refetch} on_click={(index) => {
            set_post_index(index);
            set_curr_img_url(String(listings?.[index].get_img_url));
            set_curr_title(String(listings?.[index].get_title));
            set_curr_description(String(listings?.[index].get_description));
            set_update_item_values(true);
            setTimeout(() => {
              set_update_item_values(false);
            }, 1000);
        }} data={listings} />
      </ShrinkableContainer>

     
    </>
  )
}

export default Dashboard