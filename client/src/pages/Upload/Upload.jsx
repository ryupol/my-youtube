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
      <form onSubmit={handleSubmit}>
        <h3 className="title">Upload videos</h3>
        <p>Title</p>
        <input name="title" type="text" ref={titleInput} />
        <p>Upload</p>
        <input type="file" name="image" ref={imagInput} />
        <p>description</p>
        <textarea name="description" ref={descInput} />
        <br />
        <button>Upload</button>
      </form>
    </div>
  );
}

export default Upload;
