import app from "./index.js";
import { connectDb } from "./config/dbConfig.js";
import { v2 as cloudinary } from "cloudinary";
const PORT = process.env.PORT || 3000;

// const cloduinary = cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_CLOUD_KEY!,
//   api_secret: process.env.CLOUDINARY_CLOUD_SECRET!,
// });

(async function () {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {}
})();
