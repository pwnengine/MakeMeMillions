import { useGetWindowSize } from "../hooks/useGetWindowSize";
import { useState } from 'react'

interface props {
  heading: string;
  class_name: string;
  starting_width: number;
  min_width_before_shrink_start: number;
  callapse_width: number;
  children: JSX.Element;
}

const ShrinkableContainer = ({heading, class_name, starting_width, min_width_before_shrink_start, callapse_width, children}: props) => {
  const [x] = useGetWindowSize();
  console.log(x);

  /*
  1. check to see if the container even needs to shrink
  2. if it does get get the difference between the browser's width and the min width allowed
  3. take the difference and subtract that from the width of the container


  */
  return (
    <div className={`${class_name}-outer`} style={{width: `${String(x)}px`}}>
      <h3 style={{marginLeft: '20px'}}>{heading}</h3>


      <div className={`${class_name}-inner`}>

        {children}
        
      </div>


        
    </div>
  )
}

export default ShrinkableContainer