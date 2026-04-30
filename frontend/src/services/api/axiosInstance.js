import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:5000/api",
    headers:{
        "Content-Type" : "application/json"
    },
    withCredentials:true
})

axiosInstance.interceptors.request.use((config)=>{
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response)=>{
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if(error?.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        try{
            await axios.post("http://localhost:5000/api/auth/refresh-access-token", {}, { withCredentials: true });
            return axiosInstance(originalRequest);
        }catch(refreshError){
            localStorage.removeItem("hasSession");
            window.location.replace("/signin");
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;