import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function useUserSession() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get(`/api/users/session`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
        navigate("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  return { loading, user, setUser };
}

export default useUserSession;
