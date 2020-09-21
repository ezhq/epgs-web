// import axios from 'axios'

// const baseUrl = 'http://localhost:8095/login'
import apiTrans from "app/plugin/apiTrans"

export function userLogin(loginData) {
  return apiTrans({
    url: "/login",
    method: "post",
    data: loginData
  });
}

// const postInfo = (newObject) => {
//         const request = axios.post(baseUrl, newObject)
//         return request.then(response => response.data)
// }

// export default {postInfo}
