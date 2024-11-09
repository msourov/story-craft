import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function uploadImageFiles(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      if (fs.statSync(filePath).isFile()) {
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: path.parse(file).name, // Use the file name as public_id
          unique_filename: false, // Prevent Cloudinary from renaming the file
          folder: "story-craft", // Optional: specify a folder in Cloudinary
        });

        console.log(`Uploaded ${file}: ${result.secure_url}`);
      }
    }
  } catch (error) {
    console.error("Error uploading files: ", error);
  }
}

const folderPath = "F:/Projects/story-craft/story_images";
uploadImageFiles(folderPath);
