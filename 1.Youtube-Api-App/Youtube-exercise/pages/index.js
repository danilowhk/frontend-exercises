import { useState, useEffect } from 'react';
import axios from 'axios'

const Home = () => {
  // const [youtube,setYoutube] = useState();
  const [searchInput, setSearchInput] = useState('Hello World');
  const [videosList, setVideosList] = useState([])

  const KEY = "AIzaSyCtBcmQSe2Z45jZY2hnyJoBUAm95bGCCpI";
  
  const search = async () => {
    // const res = axios.create({
    //   baserUrl: 'https://www.googleapis.com/youtube/v3/search',
    //   params: {
    //     part: 'snippet',
    //     maxResults: 12,
    //     key: KEY
    //   }
    // })

    const res =  await axios({
      "method": "GET",
      "url": 'https://www.googleapis.com/youtube/v3/search',
      "params":{
          'part':'snippet',
          'maxResults':'20',
          'key':KEY,
          'q':searchInput
      }
  })
    console.log("res",res.data.items)
    setVideosList(res.data.items);
  

    

  }

  useEffect(()=>{
      
    search();

  },[])

  // const handleFetchData = () => {
  //   console.log("Youtube:",youtube)
  // }

  const handleSearchButton= () =>{
    search()


  }

  return (
   <div className="flex flex-col items-center justify-between bg-gray-100 p-10">
   <div className="mb-10">
     <p className='text-xl text-bold border-gray-200 border-2 p-3'>Make a search on Youtube</p>

   </div>
   <div className="mb-20 flex flex-col">
     <input  onChange={e => setSearchInput(e.target.value)}className="mb-5 border-[1px] border-black px-10"></input>
     <button onClick={handleSearchButton} className="bg-[rgb(30,230,136)] px-10 py-2 rounded-md">Search</button>
   </div>

  
   <div className="grid grid-cols-3">
   {videosList.map(video => {
    return(

      <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} key={video.etag} className="bg-[#ACACAC] mb-3 mr-3 shadow-md rounded-md">
      <div className="flex flex-col items-center justify-center p-5">
       <p className="text-gray-100">{video.snippet.title}</p>
       <img  src={video.snippet.thumbnails.default.url} alt="" className="h-[150px] w-[250px]"></img>
       <video></video>
     </div>
      </a>
    )
   })}
 
    

   </div>
 </div>
 

  )
}

export default Home
