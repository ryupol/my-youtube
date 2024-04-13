import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // ตำแหน่งเก็บไฟล์ภาพ
    callback(null, './assets/images');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + ".jpg"); // กำหนดชื่อไฟล์ไม่ซ้ำกันโดยใช้ Date
  }
});

const upload = multer({storage: storage});

export default upload;