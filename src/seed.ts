
import "dotenv/config";


import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon"



const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({
    adapter
});
async function seed() {


    console.log("Seeding database with static pandals data...");

    const pandals = [
        {
            "name": "demo pandal",
            "locality": "India",
            "theme": "Festival",
            "description": "A beautiful pandal for the festival",
            "year": 2023,
            "eventYear": "2023",
            "imageUrls": [
                "image1.jpg",
                "image2.jpg"
            ],
            "bannerImageUrl": "banner.jpg",
            "latitude": 12.34,
            "longitude": 56.78
        },
        {
            "name": "demo pandal",
            "locality": "India",
            "theme": "Festival",
            "description": "A beautiful pandal for the festival",
            "year": 2023,
            "eventYear": "2023",
            "imageUrls": [
                "image1.jpg",
                "image2.jpg"
            ],
            "bannerImageUrl": "banner.jpg",
            "latitude": 12.34,
            "longitude": 56.78
        }
    ];

    await prisma.pandal.createMany({
        data: pandals,
    });


    console.log("Seeding database finished...");

    process.exit(0);


}

seed()