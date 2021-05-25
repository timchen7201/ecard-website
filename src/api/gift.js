import axios from "axios"
import Constant from '../constants'

const UploadGift=async (body)=>{
    const {data}= await axios.post(`${Constant.SERVER_URL}/chiawei`, body )
    return data
}
const FetchVideo = async(id)=>{
    try {
        const response = await axios.get(`${Constant.MEDIA_URL}/video/${id}`);
        console.log(response);
        return response.data;
      } catch (err) {
        return Promise.reject(err);
      }
}
const FetchPreViewVideo = async(id)=>{
    try{
        const response = await axios.get(`${Constant.MEDIA_URL}/api/Cards/streaming/${id}`);
        return response
    }catch(err){
        return Promise.reject(err)
    }
}
const GetVideo = async(password)=>{
    console.log("------")
    try {
        const {data} = await axios.post(`${Constant.SERVER_URL}/chiawei/getVideo`,{password:password})
        console.log("video_url",data)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const GetText = async(password)=>{
    try{
        const {data} = await axios.post(`${Constant.SERVER_URL}/chiawei/getGiftText`,{password:password})
        console.log("===",data)
        return(data)
    }catch (error) {
        return Promise.reject(error)
    }
}

const registerByXlsx= async (body)=>{
    try {
        const {data} = await axios.post(`${Constant.SERVER_URL}/chiawei/xlsx`,body)
        return data
    } catch (error) {
        
    }
}
export{
    UploadGift,
    FetchVideo,
    FetchPreViewVideo,
    GetVideo,
    GetText,
    registerByXlsx,
}