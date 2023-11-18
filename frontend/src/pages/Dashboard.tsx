import Posts from '../components/Posts';
import ShrinkableContainer from '../components/ShrinkableContainer';
import { useQueryCraigslist } from '../hooks/useQueryCraigslist'

const Dashboard = () => {
  const [data, isLoading, refetch] = useQueryCraigslist();

  if(isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  console.log(data?.[0].get_title);


  return (
    <>
      <div className="marketplace-post-container-outer">
        <h3 style={{marginLeft: '20px'}}>List With Marketplace</h3>
        
        

        <div className="marketplace-post-container-inner">
          <img width={250} height={250} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogodownload.org%2Fwp-content%2Fuploads%2F2014%2F09%2Ffacebook-logo-0.png&f=1&nofb=1&ipt=91a441588c41a8fb50724293d74a893da2b82423a7be653c16fb7816597464b9&ipo=images" />
          
          <input className="marketplace-post-input" placeholder="Title" />
          <textarea className="marketplace-post-input-large" placeholder="Description" />
          

            <button className="post-listing">Post</button>     
        

        </div>

        
      </div>


      <ShrinkableContainer heading="Free Craigslist Listings">
        <Posts data={data} />
      </ShrinkableContainer>

     
    </>
  )
}

export default Dashboard