interface props {
  heading: string;
  class_name: string;
  children: JSX.Element;
}

const ShrinkableContainer = ({heading, class_name, children}: props) => {
  return (
    <div className={`${class_name}-outer`}>
      <h3 style={{marginLeft: '20px'}}>{heading}</h3>


      <div className={`${class_name}-inner`}>

        {children}
        
      </div>


        
    </div>
  )
}

export default ShrinkableContainer