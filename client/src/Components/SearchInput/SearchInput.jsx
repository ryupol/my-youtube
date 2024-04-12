import { useRef } from "react";
import { useDispatch } from "react-redux";

import searchIcon from "@/assets/search.svg";
import "./SearchInput.scss";

function SearchInput() {
  const dispatch = useDispatch();
  const searchInput = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchInput.current.value));
  };

  return (
    <form className="searcher" onSubmit={handleSearch}>
      <input type="text" placeholder="Search" ref={searchInput} />
      <div className="btn-box">
        <div className="btn">
          <img src={searchIcon} alt="Icon" />
        </div>
        <p className="tooltip">Search</p>
      </div>
    </form>
  );
}

export default SearchInput;
