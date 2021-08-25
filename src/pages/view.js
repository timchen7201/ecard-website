import React,{useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router'
import {GetVideo,GetText } from '../api/gift'
import {getCompanyIntro} from '../api/company'


export default function View(prop){
    const {password} = useParams()
    // SetPassWord(password)
    const [videoUrl,setVideoUrl]= useState()
    const [companyData,setCompanyData] = useState()
    const [farmPic, setFarmPic] = useState([]);
    const [text,setText] = useState('')
    const [sender,setSender]=useState()
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
            if(password === "none"){
                setVideoUrl("")
                console.log('none---')
            }else{
                GetVideo(password).then((video_url)=>{setVideoUrl(video_url)})
                GetText (password).then(({gift_text,gift_from})=>{
                        setText(gift_text)
                        setSender(gift_from)
                    }
                )
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
        <div className="container mt-auto ">
           <div className="row">
                <div className="col-md-8">
                    <ReactPlayer url={videoUrl} playsinline={true} controls/>
                </div>
                <div className="col-md-4">
                    <h2>來自{sender}的祝福</h2>
                    <p>{text}</p>
                </div>
           </div>
            <div className="space-1 space-lg-2">
                <h1>公司資訊</h1>
                <h3>{companyData?.farm_name}</h3>
                <p>{companyData?.farm_address}</p>
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