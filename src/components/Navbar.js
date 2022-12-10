import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import AccountMenu from "./customize/AccountMenu";
import ButtonCreation from "./customize/ButtonCreationNav";
import Box from "@mui/material/Box";

function Navbar() {
  const { user } = useAuthContext();

  return (
    <header>
      <Box
        className="container"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ pr: 5 }}>
          <Link to="/">
            <h1>Realtime Learning</h1>
          </Link>
        </Box>
        <Box sx={{ width: "50%" }}>
          {user && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Link
                  style={{
                    marginRight: "60px",
                  }}
                  to="/groups"
                >
                  Groups
                </Link>
                <Link to="/presentations">Presentations</Link>
              </Box>

              <Box>
                <ButtonCreation />
                <AccountMenu photo={user.photo} />
              </Box>
            </Box>
          )}
        </Box>

        {!user && (
          <div>
            <Link to="/login" style={{ marginRight: "20px" }}>
              Login
            </Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </Box>
    </header>
  );
}

export default Navbar;
