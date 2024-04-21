import { useNavigate } from "react-router-dom";
import formatDate from "@/utils/formatDate";
import formatViews from "@/utils/formatViews";

import "./VideoCard.scss";

function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleToChannel = (e) => {
    e.preventDefault();
    navigate(`/${video.user_id.username}`);
  };

  return (
    <a href={`/watch?v=${video._id}`} className="card">
      <div className="thumbnail">
        <img src={video.thumbnail_url} alt="Video Thumbnail" />
      </div>
      <div className="about">
        <div className="profile" onClick={handleToChannel}>
          <img src={video.user_id.profile_url} alt="Profile Picture" />
        </div>
        <div className="text-box">
          <p className="title">{video.title}</p>
          <span className="channel" onClick={handleToChannel}>
            {video.user_id.name}
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
