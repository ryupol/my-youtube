import formatViews from "@/util/formatViews";
import formatDate from "@/util/formatDate";
import "./DetailBox.scss";

function DetailBox({ video }) {
  return (
    <div className="detail-box">
      <span className="views">{formatViews(video.views)}</span>
      <span>&nbsp;&nbsp;</span>
      <span className="date">{formatDate(video.created_at)}</span>
      <p className="description">{video.description}</p>
    </div>
  );
}

export default DetailBox;
