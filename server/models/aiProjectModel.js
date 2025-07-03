import mongoose from "mongoose";

const aiProjectSchema = new mongoose.Schema({
    image : {
        type: String,
        required: true,
    },
    software: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },

}, {timestamps : true});

const AiProject = mongoose.model("AiProject", aiProjectSchema);
export default AiProject;