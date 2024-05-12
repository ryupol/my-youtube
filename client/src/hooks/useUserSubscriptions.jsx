import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function useUserSubscriptions() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subList, setSubList] = useState(null);

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      try {
        const response = await axios.get("/api/subscribe/session");
        setSubList(response.data);
      } catch (error) {
        navigate("/sign-in");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSubscriptions();
  }, []);

  return { loading, subList, setSubList };
}

export default useUserSubscriptions;
