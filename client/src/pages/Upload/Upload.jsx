import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Upload.scss";

function Upload() {
  const navigate = useNavigate();
  const titleInput = useRef();
  const imagInput = useRef();
  const descInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", titleInput.current.value);
    formData.append("image", imagInput.current.files[0]);
    formData.append("description", descInput.current.value);

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    formData = Object.fromEntries(formData);
    try {
      await axios.post("/api/videos", formData, config);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="upload-container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Upload video</p>
        <div className="input-container">
          <input
            name="title"
            type="text"
            placeholder="Enter Video Title"
            ref={titleInput}
            required
          />
        </div>
        <input type="file" name="image" ref={imagInput} required/>
        <div className="input-container">
          <textarea name="description" placeholder="Enter Description" ref={descInput} required />
        </div>
        <br />
        <button className="submit" type="submit">
          Upload Video
        </button>
      </form>
    </div>
  );
}

export default Upload;
