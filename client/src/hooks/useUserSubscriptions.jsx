import { useState, useEffect } from "react";
import axios from "axios";

function useUserSubscriptions() {
  const [loading, setLoading] = useState(true);
  const [subList, setSubList] = useState(null);

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      try {
        const response = await axios.get("/api/subscribe/session");
        setSubList(response.data);
      } catch (error) {
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
