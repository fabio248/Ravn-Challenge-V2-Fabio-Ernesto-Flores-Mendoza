import config from './config/config';
import './utils/auth/index';
import { createServer } from './utils/server';

const app = createServer();
const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export { server, app };
