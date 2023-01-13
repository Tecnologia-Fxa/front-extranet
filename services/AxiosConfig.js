import axios from "axios";

const axiosMethod = (params) =>{
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  axios.defaults.headers.common['token-login'] = token

  let prueba = 0


  axios.interceptors.response.use(config=>{
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    axios.defaults.headers.common['token-login'] = token
    return config;
  }, err=> {
    // Do something with request error
    if ((err.response.status === 401 || err.response.status === 408) && prueba===0) {
        localStorage.removeItem('token')
        alert(err.response.data.error)
        params.router.push('/login')
        prueba++
    }else if (err.response.status === 403  && prueba===0) {
        alert(err.response.data.error)
        params.router.push('/dashboard/perfil')
        prueba++
    }
  });
}

  
export default axiosMethod