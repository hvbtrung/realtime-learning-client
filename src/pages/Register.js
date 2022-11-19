import { useState } from 'react'
import { useRegister } from '../hooks/useRegister';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { register, isLoading, success, error } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await register(email, password, name);
    }

    return (
        <form className='register' onSubmit={handleSubmit}>
            <h3>Register</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
            />

            <label>Name:</label>
            <input
                type="text"
                onChange={e => setName(e.target.value)}
                value={name}
            />

            <button disabled={isLoading}>Register</button>
            {error && <div className='error'>{error}</div>}
            {success && (
                <div className='success'>
                    <h3>Success!</h3>
                    <span>
                        You have registered for your account.
                        Check your email for your account activation link.
                    </span>
                </div>
            )}
        </form>
    );
}

export default Register;
