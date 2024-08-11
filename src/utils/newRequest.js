import axios from "axios";

const newRequest = axios.create({
    baseURL :"https://renderfamilybackend-1.onrender.com",
    withCredentials:true,
})

export default newRequest