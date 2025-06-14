import Project from "../models/projecs.model.js";
import { CustomError } from "../utils/errorUtils.js";

export const getProject = async (req, res, next) => {
  try {
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

export const createProject = async (req, res, next) => {
  const {name , description , image , price , offerPrice , category  } = req.body;
  try {
    if(!name || !description  || !price || !offerPrice || !category){
        return new CustomError('All fields are required', 400)
    }

    const image = req.files?.image?.[0];
    const zip = req.files?.zip?.[0];

    if (!image || !zip) {
      return new CustomError("Image and file is required", 400);
    }
    const newProject = {
      name ,
      description ,
      price ,
      offerPrice ,
      category ,
      image: image.path,
      file: zip.path,
    };
    const project = await Project.create(newProject);
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
export const filterProject = async (req, res, next) => {
  try {
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
export const deleteProject = async (req, res, next) => {
  try {
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
