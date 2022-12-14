import { useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { useAuthContext } from './useAuthContext';

export const usePasswordChange = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useAuthContext();

    const passwordChange = async (passwordCurrent, passwordNew) => {
        setIsLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const data = {
                passwordCurrent,
                passwordNew
            }

            // const uri = process.env.REACT_APP_API_URL;
            // const response = await axios.patch(`${uri}/api/users/updateMyPassword`, data, {
            //     withCredentials: true,
            //     validateStatus: () => true
            // });

            const response = await axiosInstance.patch(`/api/users/updateMyPassword`, data);
            const json = response.data;

            if (json.status === 'error') {
                setError(json.message);
                setSuccess(false);
                setIsLoading(false);
            }
            if (json.status === 'success') {
                dispatch({ type: 'LOGIN', payload: json.data.user });
                localStorage.setItem("token", json.token);
                setSuccess(true);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return { passwordChange, isLoading, success, error };
}
