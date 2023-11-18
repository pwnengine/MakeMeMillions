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
        <h3>Post to Facebook Marketplace</h3>
        <div className="marketplace-post-container-inner">

        </div>
      </div>


      <div className="craigslist-posts-container-outer">
        <h3 style={{marginLeft: '20px'}}>Latest Free Craigslist Posts</h3>

        <div className="craigslist-posts-container-inner">
          {
            data?.map((val) => {
              return (
                <div className="craigslist-post">
                  <img className="cragslist-post-img" src={val.get_img_url} width={200} height={175} />
                  <p className="craigslist-post-title">{val.get_title.length > 20 ? val.get_title.slice(0, 20) + '...' : val.get_title}</p>
                 
                  
                </div>
              )
            })
          }
        </div>


        <div>

        </div>
      </div>

     
    </>
  )
}

export default Dashboard