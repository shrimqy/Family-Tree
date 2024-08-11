import axios from "axios";

const newRequest = axios.create({
    baseURL :"https://renderfamilybackend-c23e.onrender.com",
    withCredentials:true,
})

export default newRequest