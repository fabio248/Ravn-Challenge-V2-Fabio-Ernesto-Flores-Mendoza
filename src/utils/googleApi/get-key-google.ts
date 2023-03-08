import stream from 'stream';
import config from '../../config/config';
import { googleDriveApi } from './auth.google';

/**

Uploads a file to Google Drive and returns its name and web view link.
@param {Object} fileObject - The file object to be uploaded.
@param {string} parentFolder - The ID of the parent folder where the file should be uploaded.
@returns {Object} - An object containing the name and web view link of the uploaded file.
*/
export async function UploadFile(fileObject, parentFolder: string) {
  // Create a PassThrough stream to read the buffer data
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.data);
  // Use the Google Drive API to create a new file with the given file data and return the file's ID and web view link
  const fileMetadata = {
    name: `${Date.now()}-${fileObject.name}`,
    parents: [parentFolder], // Specify the parent folder ID
  };
  const media = {
    mimeType: fileObject.mimeType,
    body: bufferStream,
  };

  const response = await googleDriveApi.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id,name,webViewLink',
  });
  const { data } = response;
  return { name: data.name, url: data.webViewLink };
}
