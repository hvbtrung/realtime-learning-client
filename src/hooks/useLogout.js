import axios from 'axios';
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        const url = process.env.REACT_APP_API_URL;
        await axios.get(`${url}/api/users/logout`, {
            withCredentials: true,
            validateStatus: () => true
        });

        dispatch({ type: 'LOGOUT' });
    }

    return { logout };
}
