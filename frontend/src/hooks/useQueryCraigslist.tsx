import { useQuery } from '@tanstack/react-query'
import { c_listing } from '../listing_class'
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

export const useQueryCraigslist = (): [c_listing[] | undefined, boolean, () => void] => {
  const fetch_it = async (): Promise<c_listing[]> => {
    const listings: c_listing[] = [];

    const res = await Axios.get<i_cl_query_data>('http://localhost:8080/api/v1/cl/');
    for(let q: number = 0; q < res.data.listings_length; ++q) {
      const listing: c_listing = new c_listing;
      listing.set_img_url = res.data.listings[q].img_url;
      listing.set_title = res.data.listings[q].title;
      listing.set_description = res.data.listings[q].description;

      listings.push(listing);
    }
    
    return listings;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['test'],
    queryFn: fetch_it,
  });

  return [data, isLoading, refetch];
}



