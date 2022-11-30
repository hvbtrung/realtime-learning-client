import { useState } from 'react'
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const url = process.env.REACT_APP_API_URL;

        const response = await axios.post(`${url}/api/users/login`, { email, password }, {
            withCredentials: true,
            validateStatus: () => true,
            credentials: 'include',
        });
        const json = response.data;

        if (json.status === 'error') {
            setError(json.message);
            setIsLoading(false);
        }
        if (json.status === 'success') {
            localStorage.setItem('user', JSON.stringify(json.data.user));

            dispatch({ type: 'LOGIN', payload: json.data.user });

            setIsLoading(false);
        }
    }

    return { login, isLoading, error };
}
