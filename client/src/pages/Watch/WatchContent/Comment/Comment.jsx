import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import formatDate from "@/util/formatDate";
import "./Comment.scss";

function Comment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("v");

  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  const commentInput = useRef();


  const fetchComments = async () => {
    try {
      const [commentResponse, userResponse] = await Promise.all([
        axios.get(`/api/comments/${videoId}`),
        axios.get(`/api/users/session`),
      ]);
      setComments(commentResponse.data);
      setUser(userResponse.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [location.search]);

  const handleCancel = (e) => {
    e.preventDefault();
    commentInput.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = commentInput.current.value.trim();
    if (!text) return;
    try {
      await axios.post(`/api/comments/${videoId}`, { text });
      fetchComments();
    } catch (error) {
      console.log(error);
    }
    commentInput.current.value = "";
  };

  if (loading) return "Loading...";

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
          <textarea
            className="my-comment-input"
            rows="1"
            placeholder="Add a comment..."
            ref={commentInput}
          />
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
