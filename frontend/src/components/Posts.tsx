import { c_listing } from '../listing_class'

interface props {
  data: c_listing[] | undefined;
}

const Posts = (p: props) => {
  return (
    <>
      {
        p.data?.map((val) => {
          return (
            <div className="craigslist-post">
              <img className="cragslist-post-img" src={val.get_img_url} width={200} height={175} />
              <p className="craigslist-post-title">{val.get_title.length > 20 ? val.get_title.slice(0, 20) + '...' : val.get_title}</p>
              
              
            </div>
          )
        })
      }
    </>
  )
}

export default Posts