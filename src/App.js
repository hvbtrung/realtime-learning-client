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
import { Presentation } from "./components/presentation/Presentation";
import Slides from "./components/slide/Slides";
import Profile from "./pages/profile/Profile";
import PresentationExecute from "./pages/presentationExecute/PresentationExecute";

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
              path="/groups"
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
              path="/presentations"
              element={user ? <Presentation /> : <Navigate to="/login" />}
            />

            <Route
              path="/presentations/:presentationId/slides"
              element={user ? <Slides /> : <Navigate to="/login" />}
            />

            <Route
              path="/presentations/:presentationId/execute"
              element={<PresentationExecute />}
            />

            <Route
              path="/group/detail-information/:id/"
              element={
                user ? (
                  <DetailGroupCtxProvider>
                    <Group />
                  </DetailGroupCtxProvider>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/group/join"
              element={user ? <JoinGroup /> : <Navigate to="/login" />}
            />

            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
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
