import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import likeIcon from "@/assets/like.svg";
import likeIconFill from "@/assets/like-fill.svg";
import dislikeIcon from "@/assets/dislike.svg";
import dislikeIconFill from "@/assets/dislike-fill.svg";

import "./RatingButton.scss";

function RatingButton({ likes, dislikes, fetchData }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("v");

  const [rating, setRating] = useState(null);

  const fetchRating = async () => {
    try {
      const response = await axios.get(`/api/rating/${videoId}`);
      const value = response.data;
      setRating(value ? value.rating : null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRating();
  }, []);

  const updateRating = async (rate) => {
    try {
      await axios.post(`/api/rating/${rate}/${videoId}`, { rating: rate });
      fetchRating();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rating-button">
      <button
        className="like-button"
        onClick={() => {
          updateRating("like");
        }}
      >
        <img src={rating === "like" ? likeIconFill : likeIcon} alt="Like Icon" />
        <span>{likes}</span>
      </button>
      <button className="dislike-button" onClick={() => updateRating("dislike")}>
        <img src={rating === "dislike" ? dislikeIconFill : dislikeIcon} alt="Dislike Icon" />
        <span>{dislikes}</span>
      </button>
    </div>
  );
}

export default RatingButton;
