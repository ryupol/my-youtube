import { useState } from "react";
import "./Tags.scss";

function Tags() {
  const [active, setActive] = useState("All");
  const tags = ["All", "Gaming", "Music", "Manga", "Computers"];

  return (
    <div className="tags-container">
      {tags.map((tag) => (
        <label key={tag} className="item">
          <input
            type="radio"
            value={tag}
            checked={active === tag}
            onChange={(e) => {
              setActive(e.target.value);
            }}
          />
          {tag}
        </label>
      ))}
    </div>
  );
}

export default Tags;
