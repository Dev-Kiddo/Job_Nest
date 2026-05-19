import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = async function (fileBuffer: Buffer, folderName: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: `jobnest/${folderName}` }, (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      })
      .end(fileBuffer);
  });
};
