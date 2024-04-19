import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import useUserSession from "@/hooks/useUserSession";
import useUserSubscriptions from "@/hooks/useUserSubscriptions";

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
  const location = useLocation();
  const { username } = useParams();

  const { user } = useUserSession();
  const { loading, subList } = useUserSubscriptions();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveItem("home");
    } else if (location.pathname.includes("/channel")) {
      setActiveItem("channel");
    } else if (location.pathname === "/feed/subscriptions") {
      setActiveItem("subscriptions");
    } else if (location.pathname === "/feed/likes") {
      setActiveItem("likes");
    } else {
      setActiveItem(username);
    }
  }, []);

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
        />
        <SideItem
          text="Subscriptions"
          link={"/feed/subscriptions"}
          active={activeItem === "subscriptions"}
          icon={subIcon}
          iconFill={subIconFill}
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
        />
        <SideItem
          text="Liked Videos"
          link={"/feed/likes"}
          active={activeItem === "likes"}
          icon={likeIcon}
          iconFill={likeIconFill}
        />
      </div>

      <div className="sub-menu">
        <h3 className="header">Subscriptions</h3>
        {subList.map((data) => (
          <SideItem
            text={data.sub_to_user_id.name}
            link={`/${data.sub_to_user_id.username}`}
            active={activeItem === data.sub_to_user_id.username}
            icon={data.sub_to_user_id.profile_url}
            iconFill={data.sub_to_user_id.profile_url}
            roundBorder={true}
            key={data.sub_to_user_id.username}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
