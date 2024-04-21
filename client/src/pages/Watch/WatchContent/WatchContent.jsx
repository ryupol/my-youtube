import { useEffect, useState } from "react";
import axios from "axios";

import OwnerContainer from "./OwnerContainer/OwnerContainer";
import DetailBox from "./DetailBox/DetailBox";
import Comment from "./Comments/Comments";
import getQueryValue from "@/utils/getQueryValue"
import "./WatchContent.scss";

function WatchContent() {
  const videoId = getQueryValue("v")

  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          axios.post(`/api/videos/addview/${videoId}`),
          fetchVideo(),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`/api/videos/${videoId}`);
      setVideo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return;

  return (
    <div className="watch-content">
      <div className="thumbnail">
        <img src={video.thumbnail_url} alt="Video Thumbnail" />
        <h1>Can not play video yet. Sorry</h1>
      </div>
      <h1 className="title">{video.title}</h1>
      <OwnerContainer
        video={video}
        fetchVideo={fetchVideo}
      />
      <DetailBox video={video} />
      <Comment />
    </div>
  );
}

export default WatchContent;
