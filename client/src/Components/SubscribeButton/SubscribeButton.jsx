import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import getQueryValue from "@/utils/getQueryValue";
import "./SubscribeButton.scss";

function SubscribeButton({ fetchData }) {
  const { username } = useParams();
  const videoId = getQueryValue("v");

  const [sub, setSub] = useState(false);
  const [subToUserId, setSubToUserId] = useState(null);
  const [loading, setLoading] = useState(false); // prevent multiple requests

  const fetchSubscribe = async () => {
    let response = null;
    let sub_to_user_id = null;
    try {
      if (videoId) {
        response = await axios.get(`/api/videos/${videoId}`);
        sub_to_user_id = response.data.user_id._id;
      } else if (username) {
        response = await axios.post(`/api/users/${username}`);
        sub_to_user_id = response.data._id;
      }
      const subResponse = await axios.get(`/api/subscribe/${sub_to_user_id}`);
      setSub(!!subResponse.data);
      setSubToUserId(sub_to_user_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubscribe();
  }, []);

  const updateSub = async () => {
    if (loading) return;
    setLoading(true);
    fetchSubscribe();
    let method = "";
    if (sub) {
      method = "delete";
    }
    try {
      await axios.post(`api/subscribe/${method}`, { user_id: subToUserId });
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={sub ? "sub-button-active" : "sub-button"}
      onClick={() => {
        updateSub(!sub);
      }}
    >
      Subscribe{sub ? "d" : ""}
    </button>
  );
}

export default SubscribeButton;
