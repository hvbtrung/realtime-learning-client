import axios from "axios";
import { useState } from "react";

const Home = () => {
    const [users, setUsers] = useState();

    const handleClick = async () => {
        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/api/users`, {
            withCredentials: true,
            validateStatus: () => true
        });
        const json = response.data;

        setUsers(json.data.users);
    }

    return (
        <div className="home">
            <h2>Home Page</h2>
            <button onClick={handleClick}>Get Users</button>
            {users && users.map((user, index) => (
                <div key={index}>
                    <h2>{user.email}</h2>
                    <span>{user.name}</span>
                    <h3>{user.role}</h3>
                </div>
            ))}
        </div>
    );
}

export default Home;
