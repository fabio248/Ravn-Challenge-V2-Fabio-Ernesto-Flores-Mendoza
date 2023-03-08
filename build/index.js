import config from './config/config';
import './utils/auth/index';
import { createServer } from './utils/server';
var app = createServer();
var server = app.listen(config.port, function () {
    console.log("Server running on port ".concat(config.port));
});
export { server };
//# sourceMappingURL=index.js.map