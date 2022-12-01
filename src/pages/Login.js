import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";

import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const { dispatch } = useAuthContext();
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${url}/api/users/social/login/success`,
        {
          withCredentials: true,
          validateStatus: () => true,
        }
      );
      const json = response.data;

      if (json.status === "success") {
        dispatch({ type: "LOGIN", payload: json.data.user });
      }
    };
    getUser();
  }, [url, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const handleFacebookClick = () => {
    // FacebookStrategy require https
    // Implement later
  };

  const handleGithubClick = () => {
    window.open(`${url}/api/users/github`, "_self");
  };

  const handleGoogleClick = () => {
    window.open(`${url}/api/users/google`, "_self");
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="login-banner">Login with Social Media or Manually</h2>
        <div className="vl">
          <span className="vl-innertext">or</span>
        </div>

        <div className="col social-login">
          <button className="fb btn" onClick={handleFacebookClick}>
            <FaFacebookF /> Login with Facebook
          </button>
          <button className="github btn" onClick={handleGithubClick}>
            <FaGithub /> Login with Github
          </button>
          <button className="google btn" onClick={handleGoogleClick}>
            <FaGoogle /> Login with Google+
          </button>
        </div>

        <div className="col">
          <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// return (
//     <form className='login' onSubmit={handleSubmit}>
//         <h3>Log in</h3>

//         <label>Email:</label>
//         <input
//             type='email'
//             onChange={e => setEmail(e.target.value)}
//             value={email}
//         />

//         <label>Password:</label>
//         <input
//             type='password'
//             onChange={e => setPassword(e.target.value)}
//             value={password}
//         />

//         <button disabled={isLoading}>Log in</button>
//         {error && <div className='error'>{error}</div>}
//     </form>
// );
