import React from 'react'
import './Mainpage.css'
import Video from '../Video/Video'

export default function Mainpage(props) {
 const [video , setvideo] = React.useState(false)
 const [videoid , setvideoid] = React.useState()

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
 
  function openvideo(id){
    setvideoid(id)
    setvideo(true)
    console.log(videoid)
  }

const allcards =(props.videodata).map(eachitem =>{
  
  return (
    <div className='card' onClick={()=>openvideo(eachitem.id)}>
      <img src={eachitem.snippet.thumbnails.medium.url} alt =""/>
      <h2>{eachitem.snippet.title.slice(0,78)}</h2>
      <h3>{eachitem.snippet.channelTitle}</h3>
      <p>{convertviews(eachitem.statistics.viewCount)} views</p>
    </div>
  )
})

  return (
    <div className='main-page'>
      {!video && allcards}
      {video && <Video key={videoid} id={videoid} categoryid={props.id}/>}
    </div>
  )
}

