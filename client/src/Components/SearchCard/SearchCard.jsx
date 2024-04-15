import { useNavigate } from "react-router-dom";
import formatDate from "@/util/formatDate";
import formatViews from "@/util/formatViews";
import "./SearchCard.scss";

function SearchCard({ video }) {
  const navigate = useNavigate();

  const handleToChannel = (e) => {
    e.preventDefault();
    navigate("/channel");
  };

  return (
    <a href={`/watch?v=${video._id}`} className="search-card">
      <div className="thumbnail">
        <img src={video.thumbnail_url} alt="Video Thumbnail" />
      </div>
      <div className="video-info">
        <div className="text-box">
          <p className="title">{video.title}</p>
          <p className="views">
            {formatViews(video.views)} • {formatDate(video.created_at)}
          </p>
          <div className="owner-box">
            <div className="profile" onClick={handleToChannel}>
              <img src={video.user.profile_url} alt="Profile Picture" />
            </div>
            <span className="owner-name" onClick={handleToChannel}>
              {video.user.name}
            </span>
          </div>
          <p className="description">{video.description}</p>
        </div>
      </div>
    </a>
  );
}

export default SearchCard;
