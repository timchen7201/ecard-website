import axios from "axios"
import Constant from '../constants'

const UploadGift=async (body)=>{
    const {data}= await axios.post(`${Constant.SERVER_URL}/gift/CHIAWEI`, body )
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
        const {data} = await axios.post(`${Constant.SERVER_URL}/gift/getVideo`,{password:password})
        console.log("video_url",data)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}
export{
    UploadGift,
    FetchVideo,
    FetchPreViewVideo,
    GetVideo,
}