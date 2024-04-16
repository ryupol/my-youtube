import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./SubscribeButton.scss";

function SubscribeButton({ fetchData }) {
  const [sub, setSub] = useState(false);
  const [subToUserId, setSubToUserId] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const fetchSubscribe = async () => {
    const videoId = searchParams.get("v");
    try {
      const videoResponse = await axios.get(`/api/videos/${videoId}`);
      const sub_to_user_id = videoResponse.data.user_id;
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
