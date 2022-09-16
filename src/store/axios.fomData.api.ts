import axios from "axios";




const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': ''
};

const vkHeaders = {
    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    
};

const axiosFormDataApi = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
    headers: headers
});


export const axiosVkUserData = axios.create({
    
    baseURL: 'https://api.vk.com',
    headers: vkHeaders
});

export default axiosFormDataApi
