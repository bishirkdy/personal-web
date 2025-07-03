import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../db/cloudnery.js";

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image" || file.fieldname === "ai-image") {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Invalid image file type"
        ),
        false
      );
    }
  } else if (file.fieldname === "zip") {
    if (
      file.mimetype === "application/zip" ||
      file.mimetype === "application/x-zip-compressed"
    ) {
      cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Invalid zip file type"
        ),
        false
      );
    }
  } else {
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        `Unexpected field: ${file.fieldname}`
      ),
      false
    );
  }
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "image") {
      return {
        folder: "uploads/project-profile",
        resource_type: "image",
      };
    } else if (file.fieldname === "zip") {
      return {
        folder: "uploads/project-zips",
        resource_type: "raw",
      };
    } else if (file.fieldname === "ai-image") {
      return {
        folder: "uploads/ai-projects",
        resource_type: "image",
      };
    } else {
      throw new Error(`Unexpected field: ${file.fieldname}`);
    }
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const uploadProjectFiles = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "zip", maxCount: 1 },
  { name: "ai-image", maxCount: 1 },
]);

export { uploadProjectFiles };
