import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useUserSession from "@/hooks/useUserSession";
import useClickOutside from "@/hooks/useClickOutside";
import createIcon from "@/assets/create.svg";
import "./UserMenu.scss";

function UserMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();
  const profileImage = useRef();

  const { loading, user } = useUserSession();
  useClickOutside(profileImage, () => setOpenMenu(false));

  const handleLogout = async () => {
    await axios.post("/api/users/signout");
    navigate("/sign-in");
  };

  if (loading) return "Loading...";

  return (
    <>
      {user ? (
        <div className="user-menu">
          <div className="upload">
            <button className="item" onClick={() => navigate("/upload")}>
              <img src={createIcon} alt="Create icon" />
            </button>
            <p className="tooltip">Create</p>
          </div>

          <div className="user-box" ref={profileImage}>
            <button
              className="user-image"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <img src={user.profile_url} alt="Profile" />
            </button>

            <div className={openMenu ? "open-menu" : "close-menu"}>
              <div className="header-box">
                <div className="profile">
                  <img src={user.profile_url} alt="Profile" />
                </div>
                <div className="user-info">
                  <p>{user.name}</p>
                  <p>{user.username}</p>
                  <a
                    href={`/channel/${user.username}`}
                    className="view-channel"
                  >
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
