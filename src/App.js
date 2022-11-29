import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// components & pages
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Group from "./components/group/Group.js";
import { GroupContextProvider } from "../src/context/GroupContext";
import { DetailGroupCtxProvider } from "./context/DetailGroupContext";
import { JoinGroup } from "./pages/JoinGroup";
import Profile from './pages/profile/Profile';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <GroupContextProvider>
                    <Home />
                  </GroupContextProvider>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/group/detail-information/:id/"
              element={
                <DetailGroupCtxProvider>
                  <Group />
                </DetailGroupCtxProvider>
              }
            />
            <Route path="/group/join" element={<JoinGroup />} />
            <Route path='/profile' element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
