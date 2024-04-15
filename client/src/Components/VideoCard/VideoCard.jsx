import { useNavigate } from "react-router-dom";
import formatDate from "@/util/formatDate";
import formatViews from "@/util/formatViews";

import "./VideoCard.scss";

function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleToChannel = (e) => {
    e.preventDefault();
    navigate(`/${video.user.username}`);
  };

  return (
    <a href={`/watch?v=${video._id}`} className="card">
      <div className="thumbnail">
        <img src={video.thumbnail_url} alt="Video Thumbnail" />
      </div>
      <div className="about">
        <div className="profile" onClick={handleToChannel}>
          <img src={video.user.profile_url} alt="Profile Picture" />
        </div>
        <div className="text-box">
          <p className="title">{video.title}</p>
          <span className="channel" onClick={handleToChannel}>
            {video.user.name}
          </span>
          <p className="view">
            {formatViews(video.views)} • {formatDate(video.created_at)}
          </p>
        </div>
      </div>
    </a>
  );
}

export default VideoCard;
