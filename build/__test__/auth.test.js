var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Role } from '@prisma/client';
import { createServer } from '../utils/server';
import request from 'supertest';
import { server } from '..';
import { db } from '../utils/db/db.server';
var app = createServer();
var mockUser = {
    name: 'jose',
    lastName: 'gonzales',
    email: 'jose@gmail.com',
    password: 'password',
};
describe('Auth endpoints', function () {
    var userId;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.$connect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.user.delete({ where: { id: userId } })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.$disconnect()];
                case 2:
                    _a.sent();
                    server.close();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('POST /auth/signup', function () {
        it('should return a 201 when register a new user ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app)
                            .post('/api/auth/signup')
                            .send(mockUser)];
                    case 1:
                        response = _a.sent();
                        userId = response.body.data.id;
                        // Check that the status code of the response is 201.
                        expect(response.status).toBe(201);
                        //Check that response object has the correct propities
                        expect(response.body.data).toHaveProperty('id');
                        expect(response.body.data).toHaveProperty('name', mockUser.name);
                        expect(response.body.data).toHaveProperty('lastName', mockUser.lastName);
                        expect(response.body.data).toHaveProperty('email', mockUser.email);
                        expect(response.body.data).toHaveProperty('role', Role.CLIENT);
                        expect(response.body.data).toHaveProperty('createAt');
                        expect(response.body.data).toHaveProperty('updateAt');
                        return [4 /*yield*/, db.user.findUnique({ where: { id: userId } })];
                    case 2:
                        user = _a.sent();
                        expect(user).toBeTruthy();
                        expect(user.name).toBe(mockUser.name);
                        expect(user.lastName).toBe(mockUser.lastName);
                        expect(user.email).toBe(mockUser.email);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a 400 if try register a user without email', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app).post('/api/auth/signup').send({
                            name: mockUser.name,
                            lastName: mockUser.lastName,
                            password: mockUser.password,
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('POST /auth/signin', function () {
        it('should log in an existing user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app).post('/api/auth/signin').send({
                            email: mockUser.email,
                            password: mockUser.password,
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body).toHaveProperty('token');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a 401 if user does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app).post('/api/auth/signin').send({
                            email: 'nonexistinguser@test.com',
                            password: 'password',
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a 401 if password is incorrect', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app).post('/api/auth/signin').send({
                            email: mockUser.email,
                            password: 'wrongpassword',
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(401);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=auth.test.js.map