import { useEffect, useState } from "react";
import axios from "axios";

import likeIcon from "@/assets/like.svg";
import likeIconFill from "@/assets/like-fill.svg";
import dislikeIcon from "@/assets/dislike.svg";
import dislikeIconFill from "@/assets/dislike-fill.svg";

import formatNumber from "@/utils/formatNumber";
import getQueryValue from "@/utils/getQueryValue";
import "./RatingButton.scss";

function RatingButton({ likes, dislikes, fetchData }) {
  const videoId = getQueryValue("v");

  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false); // prevent multiple requests

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
    if (loading) return;
    setLoading(true);
    try {
      await axios.post(`/api/rating/${rate}/${videoId}`, { rating: rate });
      fetchRating();
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        <img
          src={rating === "like" ? likeIconFill : likeIcon}
          alt="Like Icon"
        />
        <span>{formatNumber(likes)}</span>
      </button>
      <button
        className="dislike-button"
        onClick={() => updateRating("dislike")}
      >
        <img
          src={rating === "dislike" ? dislikeIconFill : dislikeIcon}
          alt="Dislike Icon"
        />
        <span>{formatNumber(dislikes)}</span>
      </button>
    </div>
  );
}

export default RatingButton;
