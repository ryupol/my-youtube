import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SubscribeButton from "@/components/SubscribeButton/SubscribeButton";

import formatSubscriber from "@/utils/formatSubscriber";
import formatViews from "@/utils/formatViews";
import formatDate from "@/utils/formatDate";
import banner from "@/assets/banner.jpg";
import "./Channel.scss";

function Channel() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const videoAmount = user ? user.videos.length : 0

  const fetchUser = async () => {
    try {
      const response = await axios.post(`/api/users/${username}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user || loading) return "loading...";

  return (
    <div className="channel">
      <div className="banner">
        <img src={banner} alt="Banner Image" />
      </div>
      <header className="user-header">
        <div className="profile">
          <img src={user.profile_url} alt="Profile" />
        </div>
        <div className="info">
          <div className="text-box">
            <h1 className="name">{user.name}</h1>
            <p className="user-info">
              {user.username} ‧ {formatSubscriber(user.subscriber)} ‧{" "}
              {videoAmount} {videoAmount > 1 ? "videos" : "video"}
            </p>
            <p className="description">Description</p>
          </div>
          {location.pathname.includes("/channel") ? (
            <button className="sub-button-active" onClick={() => navigate("/customize")}>
              Customize Channel
            </button>
          ) : (
            <SubscribeButton fetchData={fetchUser} />
          )}
        </div>
      </header>
      <hr />
      <section className="container">
        {user.videos.map((video, index) => (
          <a
            href={`/watch?v=${video._id}`}
            className="channel-card"
            key={index}
          >
            <div className="thumbnail">
              <img src={video.thumbnail_url} alt="Video Thumbnail" />
            </div>
            <div className="about">
              <div className="text-box">
                <p className="title">{video.title}</p>
                <p className="view">
                  {formatViews(video.views)} • {formatDate(video.created_at)}
                </p>
              </div>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}

export default Channel;
