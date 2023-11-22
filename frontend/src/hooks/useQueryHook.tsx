import { useQuery } from '@tanstack/react-query'
//import { c_listing } from '../listing_class'
import Axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQueryHook<T = any>(url: string): [T, boolean, () => void] {
  const fetch_it = async (): Promise<T> => {
    const data = (await Axios.get<T>(url)).data;
    return data;
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['test'],
    queryFn: fetch_it,
  });

  return [data as T, isLoading, refetch];
}



