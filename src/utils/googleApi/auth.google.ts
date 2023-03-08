import { google } from 'googleapis';
import path from 'path';

const __dirname = path.resolve();

const KEY_FILE_PATH = path.join(__dirname, 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// Create new GoogleAuth instance using the credentials and scope
const authGoogle = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

export const googleDriveApi = google.drive({ version: 'v3', auth: authGoogle });
