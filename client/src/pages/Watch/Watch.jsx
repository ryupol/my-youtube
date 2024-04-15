import SideContent from "./SideContent/SideContent";
import WatchContent from "./WatchContent/WatchContent";
import "./Watch.scss";

function Watch() {

  return (
    <div className="watch">
      <WatchContent/>
      <SideContent />
    </div>
  );
}

export default Watch;
