import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import path from 'path';

const MB = 5; //5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

// This function returns a middleware function that filters incoming files based on their extensions
export const fileExtLimiter = (allowedExtArray: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Get files from the request
    const files: any = req.files;
    // Extract file extensions from each file
    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    // Check if all file extensions are allowed
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    // If a file has a disallowed extension, return an error message
    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replace(
          new RegExp(',', 'g'),
          ', '
        );
      // Return the error response with status code 422 (Unprocessable Entity)
      return res.status(422).json({ status: 'error', message });
    }
    // If all file extensions are allowed, proceed to the next middleware
    next();
  };
};

// Middleware to limit the file size of uploaded files
export const fileSizeLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files: any = req.files;

  const filesOverLimit = [];
  // Check which files are over the size limit
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].name);
    }
  });

  // If there are files over the limit, return an error response
  if (filesOverLimit.length) {
    const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

    // Construct the error message
    const sentence =
      `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replace(
        new RegExp(',', 'g'),
        ', '
      );

    const message =
      filesOverLimit.length < 3
        ? sentence.replace(',', ' and')
        : sentence.replace(/,(?=[^,]*$)/, ' and');

    // Return the error response with status code 413 (Request Entity Too Large)
    return res.status(413).json({ status: 'error', message });
  }

  // If all files are within the size limit, call the next middleware
  next();
};

//Verify is sent the files at the request
export const filesPayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) throw boom.badRequest('Should upload at least one image');

  next();
};
