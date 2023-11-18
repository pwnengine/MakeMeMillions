interface props {
  heading: string;
  children: JSX.Element;
}

const ShrinkableContainer = ({heading, children}: props) => {
  return (
    <div className="craigslist-posts-container-outer">
      <h3 style={{marginLeft: '20px'}}>{heading}</h3>


      <div className="craigslist-posts-container-inner">

        {children}
        
      </div>


        
    </div>
  )
}

export default ShrinkableContainer