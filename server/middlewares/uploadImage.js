import multer from 'multer';
import path from 'path';

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadImage = multer({
  storage: storage,
  limits: {
    //fieldSize: 5 * 1024 * 1024, // no larger than 5mb, can be changed as needed.
  },
});

export default uploadImage;
