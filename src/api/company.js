import axios from 'axios'
import constants from '../constants';

const getCompanyIntro=async(id)=>{
    console.log("company intro")
    const {data} = await axios.get(`${constants.SERVER_URL}/farms/farmIntro`,{
        params: {
          farm_id: id,
        }
    });
    const {items} =data
    return items
}
export{
    getCompanyIntro,
}