export function getCloudinaryPublicId (url , folder) {
    try {
        const parts = url.split("/");
        const fileNameByExt = parts.pop()
        const fileName = fileNameByExt.split(".")[0];

        return `${folder}/${fileName}`
    } catch (error) {
        console.log("Failed to extract cloudinary public id" , error);
        
    }
}