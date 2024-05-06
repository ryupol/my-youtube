import useUserSession from "@/hooks/useUserSession";
import useUserSubscriptions from "@/hooks/useUserSubscriptions";
import SideItem from "./SideItem";

// Import Icons
import homeIcon from "@/assets/home.svg";
import subIcon from "@/assets/subscriptions.svg";
import channelIcon from "@/assets/your-channel.svg";
import likeIcon from "@/assets/like.svg";
import homeIconFill from "@/assets/home-fill.svg";
import subIconFill from "@/assets/subscriptions-fill.svg";
import channelIconFill from "@/assets/your-channel-fill.svg";
import likeIconFill from "@/assets/like-fill.svg";
import "./SideLists.scss";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SideLists() {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const { username } = useParams();
  const { loading: subLoading, subList } = useUserSubscriptions();
  const { loading: userLoading, user } = useUserSession();

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

  if (subLoading || userLoading) return;

  return (
    <div className="side-list">
      <div className="main-menu">
        {[
          {
            text: "Home",
            link: "/",
            active: activeItem === "home",
            icon: homeIcon,
            iconFill: homeIconFill,
          },
          {
            text: "Subscriptions",
            link: "/feed/subscriptions",
            active: activeItem === "subscriptions",
            icon: subIcon,
            iconFill: subIconFill,
          },
        ].map((item, index) => (
          <SideItem
            key={index}
            text={item.text}
            link={item.link}
            active={item.active}
            icon={item.icon}
            iconFill={item.iconFill}
          />
        ))}
      </div>

      <div className="you-menu">
        <h3 className="header">You</h3>
        {[
          {
            text: "Your channel",
            link: `/channel/${user.username}`,
            active: activeItem === "channel",
            icon: channelIcon,
            iconFill: channelIconFill,
          },
          {
            text: "Liked Videos",
            link: "/feed/likes",
            active: activeItem === "likes",
            icon: likeIcon,
            iconFill: likeIconFill,
          },
        ].map((item, index) => (
          <SideItem
            key={index}
            text={item.text}
            link={item.link}
            active={item.active}
            icon={item.icon}
            iconFill={item.iconFill}
          />
        ))}
      </div>

      <div className="sub-menu">
        <h3 className="header">Subscriptions</h3>
        {subList && Array.isArray(subList) && subList.length > 0
          ? subList.map((data) => (
              <SideItem
                text={data.sub_to_user_id.name}
                link={`/${data.sub_to_user_id.username}`}
                active={activeItem === data.sub_to_user_id.username}
                icon={data.sub_to_user_id.profile_url}
                iconFill={data.sub_to_user_id.profile_url}
                roundBorder={true}
                key={data.sub_to_user_id.username}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default SideLists;
