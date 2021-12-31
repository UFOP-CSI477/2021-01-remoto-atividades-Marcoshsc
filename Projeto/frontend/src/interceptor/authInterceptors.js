import axios from "axios";

axios.interceptors.response.use(response => response, error => {
  if(error.response.status === 401 && !error.request.responseURL.includes('/auth/login') && !error.request.responseURL.includes('/user/me')) {
    window.location.href = '/signin' 
  }
  throw error
})