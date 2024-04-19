import formatViews from "@/utils/formatViews";
import formatDate from "@/utils/formatDate";
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
