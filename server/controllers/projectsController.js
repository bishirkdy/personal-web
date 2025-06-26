import cloudinary from "../db/cloudnery.js";
import Project from "../models/projectsModel.js";
import { CustomError } from "../utils/errorUtils.js";
import { getCloudinaryPublicId } from "../utils/parseCloudneryUrl.js";
export const getProject = async (req, res, next) => {
  try {
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
export const createProject = async (req, res, next) => {
  const { name, description, price, offerPrice, category, software } = req.body;
  try {
    if (
      !name ||
      !description ||
      !price ||
      !offerPrice ||
      !category ||
      !software
    ) {
      return next(new CustomError("All fields are required", 400));
    }
    console.log(req.body);

    const image = req.files?.image?.[0];
    const zip = req.files?.zip?.[0];

    if (!image || !zip) {
      return next(new CustomError("Images and files are required", 400));
    }
    const newProject = {
      name,
      description,
      price,
      offerPrice,
      category,
      software,
      image: image.path,
      file: zip.path,
    };
    const project = await Project.create(newProject);
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
export const getAllProject = async (req, res, next) => {
  try {
    const project = await Project.find();
    if (!project) {
      return new CustomError("No project found", 404);
    }
    res.status(200).json({ message: "All project", project });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
export const updateProject = async (req, res, next) => {
  const { _id } = req.params;
  const { name, description, price, offerPrice, category, software } = req.body;
  try {
    const project = await Project.findById(_id);
    if (!project) {
      return next(new CustomError("Project not fount , 404"));
    }
    const { image, zip } = req.files;
    if (image && project.image) {
      await cloudinary.uploader.destroy(project.image, {
        resource_type: "image",
      });
    }
    if (zip && project.file) {
      await cloudinary.uploader.destroy(project.file, {
        resource_type: "raw",
      });
    }
    project.name = name || project.name;
    project.description = description || project.description;
    project.price = price || project.price;
    project.offerPrice = offerPrice || project.offerPrice;
    project.category = category || project.category;
    project.software = software || project.software;

    if (image) {
      project.image = image[0].path;
    }
    if (zip) {
      project.file = zip[0].path;
    }
    await project.save();
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
export const deleteProject = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const project = await Project.findById(_id);
    if (!project) {
      return next(new CustomError("Project not found", 404));
    }

    const imgPublicId = getCloudinaryPublicId(
      project.image,
      "uploads/project-profile"
    );
    const zipPublicId = getCloudinaryPublicId(
      project.file,
      "uploads/project-zips"
    );

    if (!imgPublicId || !zipPublicId) {
      return next(
        new CustomError("Cloudinary file references are invalid", 400)
      );
    }

    await cloudinary.uploader.destroy(imgPublicId, { resource_type: "image" });
    await cloudinary.uploader.destroy(zipPublicId, { resource_type: "raw" });

    await Project.findByIdAndDelete(_id); // ✅ instead of project.remove()

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

export const projectDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ _id: id });
    if (!project) {
      return next(new CustomError("Project not found", 404));
    }
    res.status(200).json({ data: project });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

export const getTopSixProject = async (req, res, next) => {
  try {
    const project = await Project.find().sort({ updatedAt: -1 }).limit(6);

    if (!project || project.length === 0) {
      return next(new CustomError("Project is not fount", 404));
    }

    res.status(200).json(project);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
