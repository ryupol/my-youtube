import VideoCard from "@/components/VideoCard/VideoCard";

import useFetchVideos from "@/hooks/useFetchVideos";
import getQueryValue from "@/utils/getQueryValue";
import "./SideContent.scss";

function SideContent() {
  const videoId = getQueryValue("v");
  const { loading, videos } = useFetchVideos({ videoId });

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
