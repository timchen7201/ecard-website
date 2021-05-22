import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import {GetVideo} from '../api/gift'
import {getCompanyIntro} from '../api/company'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import Slideshow from "../components/Slideshow";


export default function View(prop){
    const {password} = useParams()
    // SetPassWord(password)
    const [videoUrl,setVideoUrl]= useState()
    const [companyData,setCompanyData] = useState()
    const [farmPic, setFarmPic] = useState([]);

    useEffect(() => {
        getCompanyIntro(62).then((data)=>{
            setCompanyData(data)
            setFarmPic(getPropertyByRegex(data, "farm_picture|[1-9]"));
        })
        return () => {
            
        }
    }, [])
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

    function getPropertyByRegex(obj, propName) {
        var re = new RegExp("^" + propName + "(\\[\\d*\\])?$"),
          key;
        var objs = [];
        for (key in obj) if (re.test(key) && obj[key] != null) objs.push(obj[key]);
        console.log(objs);
    
        return objs;
    }
    
    return(
        <div className="container">
            <video src = {videoUrl} controls/>
            <div className="container space-1 space-lg-2">
                <h1>公司資訊</h1>
                <h3>{companyData?.farm_name}</h3>
                <p>{companyData?.farm_intro}</p>
                <p>{companyData?.farm_phone}</p>
                <p>{companyData?.farm_video}</p>
                <ul>
                    {
                       farmPic.map((img_url)=>{
                            return(<li>{img_url}</li>)
                        })
                    }
                </ul>

              
            </div>
        </div>
    )
}

export{View}