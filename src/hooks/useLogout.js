import axiosInstance from "../utils/axiosInstance";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        // const url = process.env.REACT_APP_API_URL;
        // await axios.get(`${url}/api/users/logout`, {
        //     withCredentials: true,
        //     validateStatus: () => true
        // });

        await axiosInstance.get(`/api/users/logout`);

        dispatch({ type: 'LOGOUT' });
        localStorage.setItem("token", null);
    }

    return { logout };
}
