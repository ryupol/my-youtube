import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/Slicer/UserSlice";
import axios from "axios";

import createIcon from "@/assets/create.svg";
import "./UserMenu.scss";

function UserMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileImage = useRef();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/session`);
        dispatch(setUser(response.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileImage.current && !profileImage.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/users/signout");
    dispatch(setUser(null));
  };

  if (loading) return "Loading...";

  return (
    <>
      {user ? (
        <div className="user-container">
          <div className="upload">
            <button className="item" onClick={() => navigate("/upload")}>
              <img src={createIcon} alt="Create icon" />
            </button>
            <p className="tooltip">Create</p>
          </div>

          <div className="user-box" ref={profileImage}>
            <button className="user-image" onClick={() => setOpenMenu(!openMenu)}>
              <img src={user.profile_url} alt="Profile" />
            </button>

            <div className={openMenu ? "open-menu" : "close-menu"}>
              <div className="header-box">
                <div className="profile">
                  <img src={user.profile_url} alt="Profile" />
                </div>
                <div className="user-info">
                  <p>{user.name}</p>
                  <p>{`@${user.username}`}</p>
                  <a href="/channel" className="view-channel">
                    View your channel
                  </a>
                </div>
              </div>
              <div className="footer-box">
                <button onClick={handleLogout}>Sign out</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <a href="/sign-in">Sign in</a>
      )}
    </>
  );
}

export default UserMenu;
