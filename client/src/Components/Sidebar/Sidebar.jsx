import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import SideItem from "./SideItem/SideItem";
// Import Icons
import homeIcon from "@/assets/home.svg";
import subIcon from "@/assets/subscriptions.svg";
import channelIcon from "@/assets/your-channel.svg";
import likeIcon from "@/assets/like.svg";
import homeIconFill from "@/assets/home-fill.svg";
import subIconFill from "@/assets/subscriptions-fill.svg";
import channelIconFill from "@/assets/your-channel-fill.svg";
import likeIconFill from "@/assets/like-fill.svg";
import "./Sidebar.scss";

function Sidebar({ sidebar }) {
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subList, setSubList] = useState(false);
  const [user, setUser] = useState(false);
  const location = useLocation();
  const { username } = useParams();

  useEffect(() => {
    const fetchSubList = async () => {
      try {
        const [subResponse, userResponse] = await Promise.all([
          axios.get("/api/subscribe/session"),
          axios.get("/api/users/session"),
        ]);
        setSubList(subResponse.data);
        setUser(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        navigate("/sign-in");
      }
    };

    if (location.pathname === "/") {
      setActiveItem("home");
    } else {
      setActiveItem(username);
    }
    fetchSubList();
  }, []);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  if (loading) return "loading...";

  return (
    <div className={`sidebar${sidebar ? "" : " small-sidebar"}`}>
      <div className="main-menu">
        <SideItem
          text="Home"
          link={"/"}
          active={activeItem === "home"}
          icon={homeIcon}
          iconFill={homeIconFill}
          onClick={() => handleItemClick("home")}
        />
        <SideItem
          text="Subscriptions"
          link={"/"}
          active={activeItem === "subs"}
          icon={subIcon}
          iconFill={subIconFill}
          onClick={() => handleItemClick("subs")}
        />
      </div>

      <div className="you-menu">
        <h3 className="header">You</h3>
        <SideItem
          text="Your channel"
          link={`/channel/${user.username}`}
          active={activeItem === "channel"}
          icon={channelIcon}
          iconFill={channelIconFill}
          onClick={() => handleItemClick(user.username)}
        />
        <SideItem
          text="Liked Videos"
          link={"_blank"}
          active={activeItem === "like"}
          icon={likeIcon}
          iconFill={likeIconFill}
          onClick={() => handleItemClick("like")}
        />
      </div>

      <div className="sub-menu">
        <h3 className="header">Subscriptions</h3>
        {subList.map((data) => (
          <SideItem
            text={data.user.name}
            link={`/${data.user.username}`}
            active={activeItem === data.user.username}
            icon={data.user.profile_url}
            iconFill={data.user.profile_url}
            onClick={() => handleItemClick(data.user.username)}
            key={data.user.username}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
