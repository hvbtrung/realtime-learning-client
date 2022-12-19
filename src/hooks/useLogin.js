import { useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        // const url = process.env.REACT_APP_API_URL;

        // const response = await axios.post(`${url}/api/users/login`, { email, password }, {
        //     withCredentials: true,
        //     validateStatus: () => true
        // });

        const response = await axiosInstance.post(`/api/users/login`, { email, password });
        const json = response.data;

        if (json.status === 'error') {
            setError(json.message);
            setIsLoading(false);
        }
        if (json.status === 'success') {
            dispatch({ type: 'LOGIN', payload: json.data.user });
            localStorage.setItem("token", json.token);

            setIsLoading(false);
            navigate(-1);
        }
    }

    return { login, isLoading, error };
}
