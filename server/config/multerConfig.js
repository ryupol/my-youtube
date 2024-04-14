import multer from "multer";

// Configure storage for profile images
const profileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './assets/images/profile');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "p.jpg");
  }
});

// Configure storage for thumbnail images
const thumbnailStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './assets/images/thumbnail');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "t.jpg");
  }
});

// Create multer instances for profile and thumbnail uploads
const uploadProfile = multer({storage: profileStorage}).single('profileImage');
const uploadThumbnail = multer({storage: thumbnailStorage}).single('thumbnailImage');

export { uploadProfile, uploadThumbnail };