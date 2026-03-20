// import { v2 as cloudinary } from "cloudinary";

// export const uploadToCloudinary = async function (fileBuffer: Buffer) {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: "jobnest/users" }, (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(result);
//       })
//       .end(fileBuffer);
//   });
// };
