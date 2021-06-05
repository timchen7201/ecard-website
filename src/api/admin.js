import request from "../utils/request";

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
export{
    emailSignIn,
    fetchAdmin
}