import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.Cloudname, // Click 'View API Keys' above to copy your Cloud name
        api_key: process.env.Cloudkey , 
        api_secret: process.env.Cloudsecretkey // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
    export default cloudinary;