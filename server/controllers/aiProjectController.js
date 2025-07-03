import cloudinary from '../db/cloudnery.js';
import AiProject from '../models/aiProjectModel.js';
import {CustomError} from '../utils/errorUtils.js';
import { getCloudinaryPublicId } from '../utils/parseCloudneryUrl.js';

export const addAiPrompt = async (req, res, next) => {
    const {software , prompt } = req.body;
    try {
        if(!software || !prompt) {
            return next(new CustomError("Software and prompt are required", 400));
        }
        const image = req.files["ai-image"]?.[0]
        
        if (!image) {
            return next(new CustomError("Image is required", 400));
        }
        const aiProject = await AiProject.create({
            image: image.path,
            software: software,
            prompt: prompt
        });
        res.status(200).json({success: true, message: "AI prompt added successfully", data: aiProject});
    } catch (error) {
        next(new CustomError("Failed to add AI prompt", 500));
    }
};

export const deleteAiPrompt = async (req, res, next) => {
    const {_id} = req.params;
    try {
        if(!_id){
            return next(new CustomError("Project ID is required", 400));
        }
        const aiProject = await AiProject.findById(_id);
        if(!aiProject){
            return next(new CustomError("AI prompt not found", 404));
        }
        const aiImagePublicId = getCloudinaryPublicId(aiProject.image  , "uploads/ai-projects");
        if(!aiImagePublicId) {
            return next(new CustomError("Failed to get image public ID", 500));
        }
        await cloudinary.uploader.destroy(aiImagePublicId);
        await AiProject.findByIdAndDelete(_id);
        res.status(200).json({success: true, message: "AI prompt deleted successfully"});

    } catch (error) {        
        next (new CustomError("Failed to delete AI prompt", 500) );
    }
};

export const getAllAiProjects = async (req, res, next) => {
    try {
        const aiProjects = await AiProject.find();
        if (!aiProjects || aiProjects.length === 0) {
            return next(new CustomError("No AI projects found", 404));
        }
        res.status(200).json({success: true, message: "All AI projects", data: aiProjects});
    } catch (error) {
        next(new CustomError("Failed to fetch AI projects", 500));
    }
};

export const getTopSixAiProjects = async (req, res, next) => {
    try {
        const aiProjects = await AiProject.find().sort({ createdAt: -1 }).limit(6);
        if (!aiProjects || aiProjects.length === 0) {
            return next(new CustomError("No AI projects found", 404));
        }
        res.status(200).json({success: true, message: "Top six AI projects", data: aiProjects});
    } catch (error) {
        next(new CustomError("Failed to fetch top six AI projects", 500));
    }
};