import axiosInstance from "./axiosInstance";

export const createProduct = async (data) => {
    try{
        const response = await axiosInstance.post("/product/create", data, {
            headers:{
                "Content-Type" : "multipart/form-data"
            }
        });
        return response.data;
    }catch(error){
        throw error;
    }
};

export const getAllProducts = async () => {
    try{
        const response = await axiosInstance.get("/product/all");
        return response.data;
    }catch(error){
        throw error;
    }
};

export const getProductById = async (id) => {
    try{
        const response = await axiosInstance.get(`/product/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
};

export const updateProduct = async (id, data) => {
    try{
        const response = await axiosInstance.put(`/product/${id}`, data, {
            headers:{
                "Content-Type" : "multipart/form-data"
            }
        });
        return response.data;
    }catch(error){
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try{
        const response = await axiosInstance.delete(`/product/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
};