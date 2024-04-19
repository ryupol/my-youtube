import SubscribeButton from "@/components/SubscribeButton/SubscribeButton";
import RatingButton from "@/components/RatingButton/RatingButton";

import useUserSession from "@/hooks/useUserSession";
import formatSubscriber from "@/utils/formatSubscriber";

import "./OwnerContainer.scss";

function OwnerContainer({ video, fetchVideo }) {
  const { loading, user } = useUserSession();

  if (loading) return;

  return (
    <div className="owner-container">
      <div className="owner-box">
        <div className="profile">
          <img src={video.user_id.profile_url} alt="Profile Image" />
        </div>
        <div className="text-box">
          <a href={"/" + video.user_id.username} className="owner">
            {video.user_id.name}
          </a>
          <p className="subscriber">
            {formatSubscriber(video.user_id.subscriber)}
          </p>
        </div>
        {user.id !== video.user_id._id ? (
          <SubscribeButton fetchData={fetchVideo} />
        ) : null}
      </div>
      <RatingButton
        likes={video.likes}
        dislikes={video.dislikes}
        fetchData={fetchVideo}
      />
    </div>
  );
}

export default OwnerContainer;
