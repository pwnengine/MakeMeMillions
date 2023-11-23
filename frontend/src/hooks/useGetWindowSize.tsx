import { useEffect, useState } from 'react'

export const useGetWindowSize = (): [number, number] => {
    const [screen_x, set_screen_x] = useState<number>(window.innerWidth);
    const [screen_y, set_screen_y] = useState<number>(window.innerHeight);


    useEffect(() => {
      const handle_resize = () => {
        set_screen_x(window.innerWidth);
        set_screen_y(window.innerHeight);
      };
      window.addEventListener('resize', handle_resize);
    
      return () => {
        window.removeEventListener('resize', handle_resize);
      }
    }, [])

      
      
   
    
  return [ screen_x, screen_y ];
}

