import { useEffect, useRef, useState } from "react";
import axios from "axios";

import VideoCard from "@/components/VideoCard/VideoCard";
import "./Home.scss";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const homeRef = useRef();

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos");
        let videos = response.data;
        if (location.pathname === "/feed/likes") {
          const likeResponse = await axios.get("/api/rating/user/like");
          const likeVideoIds = likeResponse.data.map((like) => like.video_id);
          videos = videos.filter((video) => likeVideoIds.includes(video._id));
        } else if (location.pathname === "/feed/subscriptions") {
          const subResponse = await axios.get("/api/subscribe/session");
          const subUserIds = subResponse.data.map(
            (sub) => sub.sub_to_user_id._id
          );
          videos = videos.filter((video) =>
            subUserIds.includes(video.user_id._id)
          );
        }
        setVideos(videos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);
  const [homeWidth, setHomeWidth] = useState();
  useEffect(() => {
    const handleResize = () => {
      if (homeRef.current) {
        const width = homeRef.current.offsetWidth;
        setHomeWidth(width);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let columns;
  if (homeWidth < 680) {
    columns = "1fr";
  } else if (homeWidth < 1010) {
    columns = "repeat(2, 1fr)";
  } else if (homeWidth < 1340) {
    columns = "repeat(3, 1fr)";
  } else if (homeWidth < 1670) {
    columns = "repeat(4, 1fr)";
  }
  // 1060 -> sidebar auto close
  // 705 -> sidebar removed

  if (loading) return "loading...";

  return (
    <div
      className="home"
      style={{ gridTemplateColumns: columns }}
      ref={homeRef}
    >
      {videos.map((video, index) => (
        <VideoCard video={video} key={index} />
      ))}
    </div>
  );
}

export default Home;
