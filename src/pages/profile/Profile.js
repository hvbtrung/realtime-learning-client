import "./profile.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useInfoChange } from "../../hooks/useInfoChange";
import { usePasswordChange } from "../../hooks/usePasswordChange";

const Profile = () => {
    const { user } = useAuthContext();

    const [file, setFile] = useState(user.photo);
    const [name, setName] = useState(user.name);
    const { infoChange, isLoading: infoLoading, success: infoSuccess, error: infoError } = useInfoChange();

    const [passwordCurrent, setPasswordCurrent] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const { passwordChange, isLoading: passwordLoading, success: passwordSuccess, error: passwordError } = usePasswordChange();

    const handleInfoClick = async (e) => {
        e.preventDefault();

        await infoChange(name, file);
    }

    const handlePasswordClick = async (e) => {
        e.preventDefault();

        await passwordChange(passwordCurrent, passwordNew);
    }

    return (
        <div className="profile">
            <div className="profileContainer">
                <div className="top">
                    <h1>User Profile</h1>
                </div>

                <div className="bottom">
                    <div className="left">
                        <img
                            src={file === user.photo ? file : URL.createObjectURL(file)}
                            alt=""
                        />
                    </div>

                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                            </div>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />

                            <div className="formInput">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button onClick={handleInfoClick} disabled={infoLoading}>Save Info</button>
                        </form>
                        {infoError && <div className='error'>{infoError}</div>}
                        {infoSuccess && (<div className='success'>Success!</div>)}
                    </div>
                </div>

                {user.active && (
                    <div className="bottom">
                        <div className="left">
                            <h1>Change Password</h1>
                        </div>

                        <div className="right">
                            <form>
                                <div className="formInput">
                                    <label htmlFor="passwordCurrent">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        id="passwordCurrent"
                                        onChange={(e) => setPasswordCurrent(e.target.value)}
                                    />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="passwordNew">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        id="passwordNew"
                                        onChange={(e) => setPasswordNew(e.target.value)}
                                    />
                                </div>
                                <button onClick={handlePasswordClick} disabled={passwordLoading}>Save Password</button>
                            </form>
                            {passwordError && <div className='error'>{passwordError}</div>}
                            {passwordSuccess && (<div className='success'>Success!</div>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
