import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import OwnerContainer from "../OwnerContainer/OwnerContainer";
import DetailBox from "../DetailBox/DetailBox";
import Comment from "../Comment/Comment";

import "./WatchContent.scss";

function WatchContent() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);
  const [videoId, setVideoId] = useState(searchParams.get("v"));
  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(null);
  const [sub, setSub] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          axios.post(`/api/videos/addview/${videoId}`),
          fetchVideo(),
          fetchComments(),
          fetchRating(),
          fetchSubscribe(),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.search]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`/api/videos/${videoId}`);
      setVideoId(videoId);
      setVideo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${videoId}`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRating = async () => {
    try {
      const response = await axios.get(`/api/rating/${videoId}`);
      const value = response.data;
      setRating(value ? value.rating : null);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubscribe = async () => {
    const videoId = new URLSearchParams(location.search).get("v");
    try {
      const videoResponse = await axios.get(`/api/videos/${videoId}`);
      const owner_user_id = videoResponse.data.user_id;
      const subResponse = await axios.get(`/api/subscribe/${owner_user_id}`);
      setUserId(owner_user_id);
      setSub(!!subResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const commentSubmit = async (text) => {
    try {
      const formData = { videoId, text };
      await axios.post("/api/comments", formData);
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const updateRating = async (rate) => {
    try {
      await axios.post(`/api/rating/${rate}/${videoId}`, { rating: rate });
      fetchRating();
      fetchVideo();
    } catch (error) {
      console.log(error);
    }
  };

  const updateSub = async () => {
    try {
      fetchSubscribe();
      let method = "";
      if (sub) {
        method = "delete";
      }
      await axios.post(`api/subscribe/${method}`, { user_id: userId });
      fetchVideo();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return "loading...";

  return (
    <div className="watch-content">
      <div className="thumbnail">
        <img src={video.thumbnail_url} alt="Video Thumbnail" />
        <h1>Can not play video yet. Sorry</h1>
      </div>
      <h1 className="title">{video.title}</h1>
      <OwnerContainer
        video={video}
        sub={sub}
        rating={rating}
        updateRating={updateRating}
        updateSub={updateSub}
      />
      <DetailBox video={video} />
      <Comment comments={comments} commentSubmit={commentSubmit} />
    </div>
  );
}

export default WatchContent;
