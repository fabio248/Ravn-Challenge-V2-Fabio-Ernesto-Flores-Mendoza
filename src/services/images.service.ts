import { db } from '../utils/db/db.server';
import { UploadFile } from '../utils/googleApi/get-key-google';
import { googleDriveApi } from '../utils/googleApi/auth.google';
import boom from '@hapi/boom';
import config from '../config/config';
import { dataImage } from '../utils/types/images.types';

type data = {
  id: string;
  name: string;
};
class ImagesService {
  constructor() {}
  async create(data) {
    const newImage = await db.image.createMany({
      data,
    });
    return newImage;
  }
  //Upload files to a specific folder by parentFolder id
  async uploadByProduct(files, productId: number) {
    try {
      let imageData = [];
      const { folderId } = await db.product.findUnique({
        where: { id: productId },
        select: { folderId: true },
      });
      // Loop through each file and upload to Google Drive
      for (const key in files) {
        imageData.push(await UploadFile(files[key], folderId));
      }
      return imageData;
    } catch (error) {
      console.error(error);
    }
  }

  //Upload files to a specific folder by parentFolder id
  async upload(files, parentFolder: string) {
    let imageData = [];
    // Loop through each file and upload to Google Drive
    for (const key in files) {
      imageData.push(await UploadFile(files[key], parentFolder));
    }
    return imageData;
  }
  //Asynchronously creates a folder with the given name in the Google Drive folder specified in the config.
  async folder(folderName: string) {
    // Define the metadata for the new folder.
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [config.googleFolder],
      permission: {
        role: 'reader',
        type: 'anyone',
      },
    };
    // Use the Google Drive API to create the new folder and retrieve its ID, name, and web view link.
    const { data } = await googleDriveApi.files.create({
      requestBody: folderMetadata,
      fields: 'id,name,webViewLink',
      supportsAllDrives: true,
    });

    return data;
  }
}

export { ImagesService };
