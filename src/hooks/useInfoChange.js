import { useState } from 'react'
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useInfoChange = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useAuthContext();

    const infoChange = async (name, file) => {
        setIsLoading(true);
        setSuccess(null);
        setError(null);

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dcb3l1cvi/image/upload",
                data
            );

            const { url } = uploadRes.data;

            const newUserInfo = {
                name,
                photo: url
            }

            const uri = process.env.REACT_APP_API_URL;
            const response = await axios.patch(`${uri}/api/users/updateMe`, newUserInfo, {
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
                localStorage.setItem('user', JSON.stringify(json.data.user));

                dispatch({ type: 'LOGIN', payload: json.data.user });
                setSuccess(true);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return { infoChange, isLoading, success, error };
}
