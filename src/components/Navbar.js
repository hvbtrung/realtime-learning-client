import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import AccountMenu from "./customize/AccountMenu";
import ButtonCreation from "./customize/ButtonCreationNav";

function Navbar() {
  const { user } = useAuthContext();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Realtime Learning</h1>
        </Link>

        <nav>
          {user && (
            <div>
              <ButtonCreation />
              <AccountMenu photo={user.photo} />
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
