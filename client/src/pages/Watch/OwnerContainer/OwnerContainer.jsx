import { useEffect, useState } from "react";

import formatSubscriber from "@/util/formatSubscriber";
import likeIcon from "@/assets/like.svg";
import likeIconFill from "@/assets/like-fill.svg";
import dislikeIcon from "@/assets/dislike.svg";
import dislikeIconFill from "@/assets/dislike-fill.svg";
import "./OwnerContainer.scss";

function OwnerContainer({ video, sub, rating, updateRating, updateSub }) {
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
        <button
          className={sub ? "sub-button-active" : "sub-button"}
          onClick={() => {
            updateSub(!sub);
          }}
        >
          Subscribe{sub ? "d" : ""}
        </button>
      </div>
      <div className="rating-box">
        <button
          className="like-button"
          onClick={() => {
            updateRating("like");
          }}
        >
          <img src={rating === "like" ? likeIconFill : likeIcon} alt="Like Icon" />
          <span>{video.likes}</span>
        </button>
        <button className="dislike-button" onClick={() => updateRating("dislike")}>
          <img src={rating === "dislike" ? dislikeIconFill : dislikeIcon} alt="Dislike Icon" />
          <span>{video.dislikes}</span>
        </button>
      </div>
    </div>
  );
}

export default OwnerContainer;
