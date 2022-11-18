import { useState } from 'react'
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const register = async (email, password, name) => {
        setIsLoading(true);
        setError(null);

        const url = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${url}/api/users/register`, { email, password, name }, {
            withCredentials: true,
            validateStatus: () => true
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

    return { register, isLoading, error };
}
