import { v2 as cloudinary } from 'cloudinary';

 cloudinary.config({ 
        cloud_name: 'decgrifce', 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET
    });
export default cloudinary;
