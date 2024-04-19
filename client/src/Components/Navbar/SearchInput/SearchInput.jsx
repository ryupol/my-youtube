import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

import searchIcon from "@/assets/search.svg";
import "./SearchInput.scss";

function SearchInput() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!value) return;

    navigate({
      pathname: "result",
      search: createSearchParams({ search_query: value }).toString(),
    });
  };

  return (
    <form className="searcher" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
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
