import { google } from 'googleapis';
import path from 'path';
var __dirname = path.resolve();
var KEY_FILE_PATH = path.join(__dirname, 'credentials.json');
var SCOPES = ['https://www.googleapis.com/auth/drive'];
// Create new GoogleAuth instance using the credentials and scope
var authGoogle = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});
export var googleDriveApi = google.drive({ version: 'v3', auth: authGoogle });
//# sourceMappingURL=auth.google.js.map