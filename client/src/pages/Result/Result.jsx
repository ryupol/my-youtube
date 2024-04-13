import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import SearchCard from "../../Components/SearchCard/SearchCard";
import "./Result.scss";

function Result() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await axios.get(`/api/videos${location.search}`);
        setSearchResult(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchSearch();
  }, [location.search]);

  if (loading) return "loading...";

  if (searchResult.length === 0) {
    return <div className="result">Not Found</div>;
  }

  return (
    <div className="result">
      {searchResult.map((video, index) => (
        <SearchCard video={video} key={index} />
      ))}
    </div>
  );
}

export default Result;
