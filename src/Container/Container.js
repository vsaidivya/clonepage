import React from 'react'
import './Container.css'
import Video from '../Video/Video'

export default function Container(props) {

  const [videodata , setvideodata] = React.useState([])
  const [videoid , setvideoid] = React.useState()

  async function fetchdata (){
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${props.category}&key=${"AIzaSyA-1qI9Ue1_k1KtH6jZdOjBr9JKQpoiBdA"}`
    await fetch(url).then(response => response.json()).then(data => setvideodata(data.items))
  }

function openvideo(id){
  setvideoid(id)
  props.setvideoplay(true)
  props.setismenu(false)
  console.log(videoid)
}
      
React.useEffect(()=>{
  fetchdata()
  console.log(videodata)
},[props.category])


  const allcards =videodata.map(eachitem =>{
    return (
      <div className='card' onClick={()=>openvideo(eachitem.id)}>
        <img src={ eachitem?
        (eachitem.snippet.thumbnails.standard?.url || 
         eachitem.snippet.thumbnails.high?.url || 
         eachitem.snippet.thumbnails.medium?.url || 
         eachitem.snippet.thumbnails.default?.url)
      : ''
  } 
  alt="" 
/>
        <h2>{eachitem.snippet.title.slice(0,78)}</h2>
        <h3>{eachitem.snippet.channelTitle}</h3>
        <p>{convertviews(eachitem.statistics.viewCount)} views</p>
      </div>
    )
  }) 


  function convertviews(views){
    if(views>=1000000){
      return Math.floor(views/1000000)+"M";
    }
    else if(views>1000){
      return Math.floor(views/1000)+"K"
    }
    else{
      return views
    }
  }


  return (
    <div className='container'>
      <div className={props.ismenu? "small" : "large"}>
        <div className='main-page'>
        {!props.videoplay && allcards}
      {props.videoplay && <Video key={videoid} videoid={videoid} categoryid={props.category} setvideoid={setvideoid}/>}
        </div>
      </div>
     
    </div>
    
  )
}
