import { useState } from "react";
import SideItem from "../SideItem/SideItem";

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

function Sidebar() {
  const [activeItem, setActiveItem] = useState("home");

  const sideSub = {
    "9arm": "#!",
    HEARTROCKER: "#!",
    "KND Studio": "#!",
    "NAT VS FOOD": "#!",
    NeetCodeIO: "#!",
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="sidebar">
      <div className="main-menu">
        <SideItem
          active={activeItem === "home"}
          icon={homeIcon}
          iconFill={homeIconFill}
          text="Home"
          onClick={() => handleItemClick("home")}
        />
        <SideItem
          active={activeItem === "subs"}
          icon={subIcon}
          iconFill={subIconFill}
          text="Subscriptions"
          onClick={() => handleItemClick("subs")}
        />
      </div>

      <div className="you-menu">
        <h3 className="header">You</h3>
        <SideItem
          active={activeItem === "channel"}
          icon={channelIcon}
          iconFill={channelIconFill}
          text="Your channel"
          onClick={() => handleItemClick("channel")}
        />
        <SideItem
          active={activeItem === "like"}
          icon={likeIcon}
          iconFill={likeIconFill}
          text="Liked Videos"
          onClick={() => handleItemClick("like")}
        />
      </div>

      <div className="sub-menu">
        <h3 className="header">Subscriptions</h3>
        {Object.entries(sideSub).map(([title, link]) => (
          <a href={link} className="item" key={title}>
            <div className="icon">
              <img src="https://via.placeholder.com/24x24" alt="Channel Image" />
            </div>
            <p>{title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
