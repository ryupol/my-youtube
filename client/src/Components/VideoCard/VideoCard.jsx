import { useNavigate } from "react-router-dom";
import formatDate from "@/util/formatDate";
import formatViews from "@/util/formatAmount";

import "./VideoCard.scss";

function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleToChannel = (e) => {
    e.preventDefault();
    navigate("/channel");
  };

  return (
    <a href="/" className="card">
      <div className="thumbnail">
        <img src={video.thumbnail_url} alt="Video Thumbnail" />
      </div>
      <section className="about">
        <div className="profile" onClick={handleToChannel}>
          <img src={video.user_profile_url} alt="Profile Picture" />
        </div>
        <div className="text-box">
          <p className="title">{video.title}</p>
          <span className="channel" onClick={handleToChannel}>
            {video.user_name}
          </span>
          <p className="view">
            {formatViews(video.views)} • {formatDate(video.created_at)}
          </p>
        </div>
      </section>
    </a>
  );
}

export default VideoCard;
