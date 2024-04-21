import { useEffect, useState } from "react";
import axios from "axios";

const useFetchVideos = ({ pathname = "", videoId = null }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos");
        let filteredVideos = response.data;

        if (pathname === "/feed/likes") {
          const likeResponse = await axios.get("/api/rating/user/like");
          const likeVideoIds = likeResponse.data.map((like) => like.video_id);
          filteredVideos = filteredVideos.filter((video) =>
            likeVideoIds.includes(video._id)
          );
        } else if (pathname === "/feed/subscriptions") {
          const subResponse = await axios.get("/api/subscribe/session");
          const subUserIds = subResponse.data.map(
            (sub) => sub.sub_to_user_id._id
          );
          filteredVideos = filteredVideos.filter((video) =>
            subUserIds.includes(video.user_id._id)
          );
        }

        if (videoId) {
          filteredVideos = filteredVideos.filter(
            (video) => video._id !== videoId
          );
        }

        setVideos(filteredVideos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [location.pathname, videoId]);

  return { loading, videos };
};

export default useFetchVideos;
