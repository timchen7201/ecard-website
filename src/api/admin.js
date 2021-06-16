import request from "../utils/request";
import storage from "../utils/storage";

const emailSignIn=async ({ username, password }) => {
    try {
      const { data } = await request.post(`/chiawei/signin`, {
        username,
        password,
      });
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };
const fetchAdmin = async () => {
    try {
      const { data } = await request.get(`/chiawei/info`);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
};

const fetchRecord = async() =>{

  const translate_product = (products)=>{
    var product_str=""
    for (let idx = 0; idx < products.length; idx++) {
      const element = products[idx];
      product_str+=element+'、'
    }
    return product_str.slice(0, -1)
  }

  const token = storage.getAccessToken()
  try {
      const {data } = await request.post(`/chiawei/orders`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        data[index].products=translate_product(element.products)
        
      }
      return data
  } catch (error) {
    console.log(error)
  }
}

export{
    emailSignIn,
    fetchAdmin,
    fetchRecord,
}