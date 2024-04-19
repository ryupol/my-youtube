import { useEffect, useState } from "react";
import axios from "axios";

import VideoCard from "@/components/VideoCard/VideoCard";

import getQueryValue from "@/utils/getQueryValue";
import "./SideContent.scss";

function SideContent() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState(null);
  const videoId = getQueryValue("v");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos");
        const videos = response.data.filter((video) => video._id !== videoId);
        setVideos(videos);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return "loading...";

  return (
    <div className="side-content">
      {videos.map((video, index) => (
        <VideoCard video={video} key={index} />
      ))}
    </div>
  );
}

export default SideContent;
