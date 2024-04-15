import { useRef } from "react";
import { useSelector } from "react-redux";

import formatDate from "@/util/formatDate";
import "./Comment.scss";

function Comment({ comments, commentSubmit }) {
  const commentInput = useRef();
  const { user } = useSelector((state) => state.user);

  const handleCancel = (e) => {
    e.preventDefault;
    commentInput.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = commentInput.current.value.trim();
    if (!text) return;

    commentSubmit(text);
    commentInput.current.value = "";
  };

  return (
    <div className="comment">
      <h1 className="count">
        {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
      </h1>
      <div className="my-box">
        <div className="profile">
          <img src={user.profile_url} alt="User Profile" />
        </div>
        <form className="my-comment-box" onSubmit={handleSubmit}>
          <textarea className="my-comment-input" rows="1" placeholder="Add a comment..." ref={commentInput} />
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="submit-btn">Submit</button>
        </form>
      </div>
      {comments.map((comment, index) => (
        <div className="other-box" key={index}>
          <div className="profile">
            <img src={comment.user.profile_url} alt="" />
          </div>
          <div className="other-info">
            <p className="username">
              {comment.user.username} <span className="date">{formatDate(comment.created_at)}</span>
            </p>
            <p className="other-comment">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
