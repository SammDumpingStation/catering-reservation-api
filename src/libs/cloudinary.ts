import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "@config/env.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dyyks7im7",
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
