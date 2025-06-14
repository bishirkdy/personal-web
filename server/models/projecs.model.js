import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name : {type : String , required : true},
    description : {type : String , required : true},
    image : {type : String , required : true },
    price : {type : Number , required : true },
    offerPrice : Number ,
    category : {type : String , required : true },
    file : {type : String , required : true },
}, { timestamps: true})

const Project = mongoose.model("Project" , projectSchema)
export default Project;