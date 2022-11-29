import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogoutClick = async () => {
        await logout();
    }

    return (
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>Realtime Learning</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link to="/profile"><span>{user.email}</span></Link>
                            <button onClick={handleLogoutClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
