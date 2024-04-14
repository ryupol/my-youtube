import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import VideoCard from "@/Components/VideoCard/VideoCard";
import formatSubscriber from "@/util/formatSubscriber";
import "./Channel.scss";

function Channel() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users?username=${username}`);
        setUser(response.data[0]);
        console.log(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return "loading...";

  return (
    <div className="channel">
      <div className="banner">
        <img
          src="https://yt3.googleusercontent.com/4hsLXfPp78kGbpbrGBu9fojBGZrgqPhfrO1LgIRIugQAa3zyjb5nYJZtAPDqzhJbuPpPAXzUQQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
          alt="Banner Image"
        />
      </div>
      <header className="user-header">
        <div className="profile">
          <img src="http://localhost:3000/images/profile/defaultProfile.png" alt="Profile" />
        </div>
        <div className="info">
          <div className="text-box">
            <h1 className="name">{user.name}</h1>
            <p className="user-info">
              {user.username} ‧ {formatSubscriber(user.subscriber)} ‧ {user.videos.length}{" "}
              {user.videos.length > 1 ? "videos" : "video"}
            </p>
            <p className="description">Description</p>
          </div>
          <div className="button-box">
            <button className="unsub">Subscribe</button>
            <button className="sub">Subscribed</button>
          </div>
        </div>
      </header>
      <hr />
      <section className="container">
        {user.videos.map((video, index) => {
          <VideoCard video={video} key={index} />;
        })}
      </section>
    </div>
  );
}

export default Channel;
