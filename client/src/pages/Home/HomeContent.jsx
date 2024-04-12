import { useEffect, useState } from "react";
import axios from "axios";

import VideoCard from "@/Components/VideoCard/VideoCard";
import Tags from "@/Components/Tags/Tags";
import "./HomeContent.scss";

function HomeContent() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos");
        setVideos(response.data);
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
    <div className="content">
      <Tags />
      <section className="container">
        {videos.map((video, index) => (
          <VideoCard video={video} key={index} />
        ))}
      </section>
    </div>
  );
}

export default HomeContent;
HomeContent;
