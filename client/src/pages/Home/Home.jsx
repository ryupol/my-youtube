import { useRef } from "react";
import { useLocation } from "react-router-dom";

import VideoCard from "@/components/VideoCard/VideoCard";
import "./Home.scss";
import useFetchVideos from "@/hooks/useFetchVideos";
import useGridResize from "@/hooks/useGridResize";

function Home() {
  const homeRef = useRef();
  const location = useLocation();
  const pathname = location.pathname;
  const { loading, videos } = useFetchVideos({ pathname });
  const gridColumns = useGridResize(homeRef);

  if (loading) return;

  return (
    <div className="home" ref={homeRef} style={{ gridTemplateColumns: gridColumns }}>
      {videos.map((video, index) => (
        <VideoCard video={video} key={index} />
      ))}
    </div>
  );
}

export default Home;
