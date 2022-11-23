import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import AccountMenu from "./customize/AccountMenu";
import ButtonCreation from "./customize/ButtonCreationNav";
import { useState } from "react";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // const handleLogoutClick = async () => {
  //   await logout();
  // };

  const pathname = window.location.pathname;

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Realtime Learning</h1>
        </Link>

        {pathname.includes("/group") && (
          <span>
            <Link to="/group/news">
              <span>Notitication</span>
            </Link>

            <Link to="/group/" style={{ marginLeft: "15px" }}>
              <span>Members</span>
            </Link>
          </span>
        )}

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
