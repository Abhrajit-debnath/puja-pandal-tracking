import "dotenv/config"

import { v2 as cloudinary } from 'cloudinary'
import { logger } from "../logger.js";

let cloudinaryConfig;


if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_KEY_SECRET) {
    logger.fatal('CLOUDINARY_API_KEY and CLOUDINARY_API_KEY_SECRET are required');
    process.exit(1);
} else {
    cloudinaryConfig = {
        cloud_name: 'dcsrvev2l',
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
        secureHeapUsed: true

    }
}



cloudinary.config(cloudinaryConfig)

export { cloudinary }