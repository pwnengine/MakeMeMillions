import { c_listing } from '../listing_class'

interface props {
  data: c_listing[] | undefined;
  on_click: (index: number) => void;
  handle_update: () => void;
}

const Posts = (p: props) => {
  return (
    <>
      <button className="update-cl-posts" onClick={() => {
        console.log('hleloo');
        p.handle_update()
      }}>Update</button>
      {
        p.data?.map((val, index) => {
          return (
            <div onClick={() => p.on_click(index)} className="craigslist-post">
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