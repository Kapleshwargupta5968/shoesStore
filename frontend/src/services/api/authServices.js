import axiosInstance from "./axiosInstance";

export const registerUser = async (data) => {
    try{
        const response = await axiosInstance.post("/auth/signup", data);
        localStorage.setItem("hasSession", "true");
        return response.data;
    }catch(error){
        throw error;
    }
};

export const loginUser = async (data) => {
    try{
        const response = await axiosInstance.post("/auth/signin", data);
        localStorage.setItem("hasSession", "true");
        return response.data;
    }catch(error){
        throw error;
    }
};

export const logoutUser = async () => {
    try{
        const response = await axiosInstance.post("/auth/logout");
        localStorage.removeItem("hasSession");
        return response.data;
    }catch(error){
        throw error;
    }
};

export const getCurrentUser = async () => {
    try{
        const response = await axiosInstance.get("/auth/profile",{});
        return response.data;
    }catch(error){
        throw error;
    }
};