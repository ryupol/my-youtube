import { useEffect, useRef, useState } from "react";
import axios from "axios";

import useUserSession from "@/hooks/useUserSession";
import formatDate from "@/utils/formatDate";
import getQueryValue from "@/utils/getQueryValue";
import "./Comments.scss";
import { useSelector } from "react-redux";

function Comment() {
  const videoId = getQueryValue("v");
  const [comments, setComments] = useState([]);
  const { loading, user } = useUserSession();
  const commentInput = useRef();


  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${videoId}`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
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
              {comment.user.username}{" "}
              <span className="date">{formatDate(comment.created_at)}</span>
            </p>
            <p className="other-comment">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
