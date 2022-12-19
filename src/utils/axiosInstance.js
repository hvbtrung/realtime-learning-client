import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
    },
    withCredentials: true,
    validateStatus: () => true,
});

export default axiosInstance;
