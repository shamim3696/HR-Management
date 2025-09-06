import { Request } from 'express';
import multer from 'multer';
import path from 'path';

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File validation:
const fileFilter = (req: Request, file: any, cb: any) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, png, gif)'), false);
  }
};

// Set up multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single('profile_photo');

export const uploadFile = (req: any, res: any, next: Function) => {
  upload(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading file',
      });
    }
    next();
  });
};

export default uploadFile;
