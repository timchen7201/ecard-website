import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import {GetVideo} from '../api/gift'



export default function View(prop){
    const {password} = useParams()
    // SetPassWord(password)
    const [videoUrl,setVideoUrl]= useState()
    useEffect(()=>{
        
        if(password!=null){
            if(password == "none"){
                setVideoUrl("")
                console.log('none---')
            }else{
                GetVideo(password).then((video_url)=>{setVideoUrl(video_url)})

            }
        }
    },[password])
    
    return(
        <div className="container">
        <video src = {videoUrl}controls/>
        </div>
    )
}

export{View}