import { useRef } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

import searchIcon from "@/assets/search.svg";
import "./SearchInput.scss";

function SearchInput() {
  const navigate = useNavigate();
  const searchInput = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = searchInput.current.value;
    navigate({
      pathname: "result",
      search: createSearchParams({ search_query: params }).toString(),
    });
  };

  return (
    <form className="searcher" onSubmit={handleSearch}>
      <input type="text" placeholder="Search" ref={searchInput} />
      <button className="btn-box">
        <div className="btn">
          <img src={searchIcon} alt="Icon" />
        </div>
        <p className="tooltip">Search</p>
      </button>
    </form>
  );
}

export default SearchInput;
