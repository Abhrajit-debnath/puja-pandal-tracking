import { cloudinary } from "../config/cloudinary/cloudinary.config.js";
import { logger } from "../config/logger.js";
import path from "path";

async function seedImages() {
    logger.info("Seeding images to cloudinary...");

  
    const currentDir = import.meta.dirname;

    const imageUrls = [
        path.join(currentDir, "../seed/images/bundle_splitting_comparison.svg"),
        path.join(currentDir, "../seed/images/critical_css_flow.svg")
    ];

    const uploadPromises = imageUrls.map(async (imageUrl) => {
        try {
            const result = await cloudinary.uploader.upload(imageUrl, { 
                folder: "puja-track26",
                resource_type: "image" 
            });
            
            logger.info(`Successfully uploaded ${imageUrl}: ${result.secure_url}`);
            return result.secure_url;
        } catch (error) {
            logger.error(`Error uploading ${imageUrl}: ${JSON.stringify(error, null, 2)}`);
            return null; 
        }
    });


    console.log(uploadPromises);


}

seedImages().catch(err => {
    logger.error(`Fatal script execution error: ${err}`);
});
