import { PrismaClient } from '@prisma/client';
var db;
if (!global.__db) {
    global.__db = new PrismaClient();
}
db = global.__db;
export { db };
//# sourceMappingURL=db.server.js.map