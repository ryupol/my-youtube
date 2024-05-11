import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setNavSearch } from "@/store/Slicer/navSearchSlice";
import useUserSession from "@/hooks/useUserSession";
import useClickOutside from "@/hooks/useClickOutside";
import createIcon from "@/assets/create.svg";
import searchIcon from "@/assets/search.svg";
import signoutIcon from "@/assets/sign-out.svg";
import "./UserMenu.scss";
import IconItem from "../../IconItem/IconItem";

function UserMenu({ searchResize }) {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();
  const profileImage = useRef();

  const { loading, user } = useUserSession();
  useClickOutside(profileImage, () => setOpenMenu(false));

  const handleLogout = async () => {
    await axios.post("/api/users/signout");
    navigate("/sign-in");
  };

  if (loading) {
    navigate("/sign-in");
  }

  return (
    <>
      {user ? (
        <div className="user-menu">
          {searchResize ? (
            <IconItem
              name={"search"}
              icon={searchIcon}
              callback={() => dispatch(setNavSearch(true))}
            />
          ) : (
            <></>
          )}

          <IconItem name={"Create"} icon={createIcon} callback={() => navigate("/upload")} />

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
                  <p>{user.username}</p>
                  <a href={`/channel/${user.username}`} className="view-channel">
                    View your channel
                  </a>
                </div>
              </div>
              <div className="footer-box">
                <div className="item" onClick={handleLogout}>
                  <img src={signoutIcon} alt="" />
                  <p>Sign out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <a className="user-menu" href="/sign-in">
          
        </a>
      )}
    </>
  );
}

export default UserMenu;
