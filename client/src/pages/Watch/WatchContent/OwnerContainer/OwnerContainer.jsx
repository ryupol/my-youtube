import SubscribeButton from "@/Components/SubscribeButton/SubscribeButton";
import RatingButton from "@/Components/RatingButton/RatingButton";

import formatSubscriber from "@/util/formatSubscriber";

import "./OwnerContainer.scss";

function OwnerContainer({ video, fetchVideo }) {
  return (
    <div className="owner-container">
      <div className="owner-box">
        <div className="profile">
          <img src={video.user.profile_url} alt="Profile Image" />
        </div>
        <div className="text-box">
          <a href={"/" + video.user.username} className="owner">
            {video.user.name}
          </a>
          <p className="subscriber">{formatSubscriber(video.user.subscriber)}</p>
        </div>
        <SubscribeButton fetchData={fetchVideo} />
      </div>
      <RatingButton likes={video.likes} dislikes={video.dislikes} fetchData={fetchVideo} />
    </div>
  );
}

export default OwnerContainer;
