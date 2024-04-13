import OwnerContainer from "../OwnerContainer/OwnerContainer";
import DetailBox from "../DetailBox/DetailBox";
import Comment from "../Comment/Comment";

import "./WatchContent.scss";

function WatchContent() {
  return (
    <div className="watch-content">
      <div className="thumbnail">
        <img src="/favicon.png" alt="Video Thumbnail" />
        <h1>Can not play video yet. Sorry</h1>
      </div>
      <h1 className="title">โลกเราเพิ่งรอดจากการโดน Hack ครั้งใหญ่</h1>
      <OwnerContainer />
      <DetailBox />
      <Comment />
    </div>
  );
}

export default WatchContent;
