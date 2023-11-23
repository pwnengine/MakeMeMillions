import { useGetWindowSize } from "../hooks/useGetWindowSize";
import { useState } from 'react'

interface props {
  heading: string;
  class_name: string;
  container_width: number;
  min_browser_width_before_shrink: number;
  callapse_width?: number;
  shrink_multiply?: number;
  children: JSX.Element;
}

const ShrinkableContainer = ({heading, class_name, container_width, min_browser_width_before_shrink, callapse_width = 0, shrink_multiply = 10, children}: props) => {
  const [browser_width] = useGetWindowSize();
  console.log(browser_width);

  const [new_container_width, set_new_container_width] = useState<number>(container_width);
  

  /*
  1. check to see if the container even needs to shrink
  2. if it does get get the difference between the browser's width and the min width allowed
  3. take the difference and subtract that from the width of the container


  */

  if(browser_width < min_browser_width_before_shrink) {
    console.log(browser_width+'<'+min_browser_width_before_shrink);
    const calc_width = container_width - ((min_browser_width_before_shrink - browser_width) - shrink_multiply);
    if(new_container_width != calc_width) {
      set_new_container_width(calc_width);
    }
  }

  console.log('container width: ' + new_container_width);
  return (
    <div className={`${class_name}-outer`} style={{width: `${String(new_container_width)}px`}}>
      <h3 style={{marginLeft: '20px'}}>{heading}</h3>


      <div className={`${class_name}-inner`}>

        {children}
        
      </div>


        
    </div>
  )
}

export default ShrinkableContainer