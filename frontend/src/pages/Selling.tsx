import ShrinkableContainer from '../components/ShrinkableContainer'

const Selling = () => {
  return (
    <>
      <ShrinkableContainer heading="Active Listings" class_name="generic-container" container_width={1200} min_browser_width_before_shrink={1500}>
        <div>
          <p>hello</p>
        </div>
      </ShrinkableContainer>
    </>
  )
}

export default Selling