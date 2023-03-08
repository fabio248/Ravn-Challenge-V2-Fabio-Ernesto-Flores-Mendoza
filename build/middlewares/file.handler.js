import boom from '@hapi/boom';
import path from 'path';
var MB = 5; //5 MB
var FILE_SIZE_LIMIT = MB * 1024 * 1024;
// This function returns a middleware function that filters incoming files based on their extensions
export var fileExtLimiter = function (allowedExtArray) {
    return function (req, res, next) {
        // Get files from the request
        var files = req.files;
        // Extract file extensions from each file
        var fileExtensions = [];
        Object.keys(files).forEach(function (key) {
            fileExtensions.push(path.extname(files[key].name));
        });
        // Check if all file extensions are allowed
        var allowed = fileExtensions.every(function (ext) {
            return allowedExtArray.includes(ext);
        });
        // If a file has a disallowed extension, return an error message
        if (!allowed) {
            var message = "Upload failed. Only ".concat(allowedExtArray.toString(), " files allowed.").replace(new RegExp(',', 'g'), ', ');
            // Return the error response with status code 422 (Unprocessable Entity)
            return res.status(422).json({ status: 'error', message: message });
        }
        // If all file extensions are allowed, proceed to the next middleware
        next();
    };
};
// Middleware to limit the file size of uploaded files
export var fileSizeLimiter = function (req, res, next) {
    var files = req.files;
    var filesOverLimit = [];
    // Check which files are over the size limit
    Object.keys(files).forEach(function (key) {
        if (files[key].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[key].name);
        }
    });
    // If there are files over the limit, return an error response
    if (filesOverLimit.length) {
        var properVerb = filesOverLimit.length > 1 ? 'are' : 'is';
        // Construct the error message
        var sentence = "Upload failed. ".concat(filesOverLimit.toString(), " ").concat(properVerb, " over the file size limit of ").concat(MB, " MB.").replace(new RegExp(',', 'g'), ', ');
        var message = filesOverLimit.length < 3
            ? sentence.replace(',', ' and')
            : sentence.replace(/,(?=[^,]*$)/, ' and');
        // Return the error response with status code 413 (Request Entity Too Large)
        return res.status(413).json({ status: 'error', message: message });
    }
    // If all files are within the size limit, call the next middleware
    next();
};
//Verify is sent the files at the request
export var filesPayloadExists = function (req, res, next) {
    if (!req.files)
        throw boom.badRequest('Should upload at least one image');
    next();
};
//# sourceMappingURL=file.handler.js.map