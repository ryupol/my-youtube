import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useUserSession from "@/hooks/useUserSession";

import cameraIcon from "@/assets/camera.svg";
import "./Customize.scss";

function Customize() {
  const [imgPreview, setImgPreview] = useState(null);

  const navigate = useNavigate();
  const fileInput = useRef();
  const nameInput = useRef();
  const { loading, user } = useUserSession();

  useEffect(() => {
    if (!loading) {
      setImgPreview(user.profile_url);
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    formData.append("name", nameInput.current.value);

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    formData = Object.fromEntries(formData);
    try {
      await axios.post("/api/users/update", formData, config);
      navigate(`/channel/${user.username}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return "Loading...";

  return (
    <div className="customize">
      <form className="form" onSubmit={handleSubmit}>
        <div className="profile-editor">
          <label htmlFor="file-input">
            <div className="profile">
              <img src={imgPreview} alt="Profile" />
              <div className="hover-icon">
                <img src={cameraIcon} alt="Camera Icon" />
              </div>
            </div>
            <p className="tooltip">Edit profile picture</p>
          </label>
          <input id="file-input" type="file" ref={fileInput} onChange={handleFileChange} />
        </div>
        <div className="name-editor">
          <h2 className="form-title">Edit Profile</h2>
          <div className="input-container">
            <input name="name" type="text" defaultValue={user.name} ref={nameInput} required />
          </div>
          <div className="button-container">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/channel/${user.username}`, { replace: true });
              }}
              className="cancel"
            >
              Cancel
            </button>
            <button type="submit" className="submit">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Customize;
