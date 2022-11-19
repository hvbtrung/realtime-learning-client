import { useState } from 'react'
import axios from 'axios';

export const useRegister = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const register = async (email, password, name) => {
        setIsLoading(true);
        setSuccess(null);
        setError(null);

        const url = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${url}/api/users/register`, { email, password, name }, {
            withCredentials: true,
            validateStatus: () => true
        });
        const json = response.data;

        if (json.status === 'error') {
            setError(json.message);
            setSuccess(false);
            setIsLoading(false);
        }
        if (json.status === 'success') {
            setSuccess(true);
            setIsLoading(false);
        }
    }

    return { register, isLoading, success, error };
}
