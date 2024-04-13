import { useState } from "react";

import likeIcon from "@/assets/like.svg";
import likeIconFill from "@/assets/like-fill.svg";
import dislikeIcon from "@/assets/dislike.svg";
import dislikeIconFill from "@/assets/dislike-fill.svg";
import "./OwnerContainer.scss";

function OwnerContainer() {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  return (
    <div className="owner-container">
      <div className="owner-box">
        <div className="profile">
          <img src="https://via.placeholder.com/40x40" alt="Profile Image" />
        </div>
        <div className="text-box">
          <a href="/channel" className="owner">
            BorntoDev
          </a>
          <p className="subscriber">336K subscribers</p>
        </div>
        <button className="sub-button">Subscribe</button>
      </div>
      <div className="rating-box">
        <button
          className="like-button"
          onClick={() => {
            setLike(!like);
            setDislike(false);
          }}
        >
          <img src={like ? likeIconFill : likeIcon} alt="Like Icon" />
          <span>311</span>
        </button>
        <button
          className="dislike-button"
          onClick={() => {
            setDislike(!dislike);
            setLike(false);
          }}
        >
          <img src={dislike ? dislikeIconFill : dislikeIcon} alt="Dislike Icon" />
          <span>12</span>
        </button>
      </div>
    </div>
  );
}

export default OwnerContainer;
