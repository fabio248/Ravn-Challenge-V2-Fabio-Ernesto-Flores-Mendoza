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
import bcrypt from "bcrypt";
import boom from "@hapi/boom";
import { db } from "../utils/db/db.server";
var selectedDataUser = {
    id: true,
    name: true,
    lastName: true,
    role: true,
    email: true,
    createAt: true,
    updateAt: true,
};
var UserService = /** @class */ (function () {
    function UserService() {
    }
    //Creates a new user.
    UserService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var name, lastName, email, password, role, hashPassword, createUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = data.name, lastName = data.lastName, email = data.email, password = data.password, role = data.role;
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hashPassword = _a.sent();
                        data.password = hashPassword;
                        return [4 /*yield*/, db.user.create({
                                data: { name: name, lastName: lastName, email: email, password: hashPassword, role: role },
                                select: selectedDataUser,
                            })];
                    case 2:
                        createUser = _a.sent();
                        return [2 /*return*/, createUser];
                }
            });
        });
    };
    //Finds all users.
    UserService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                users = db.user.findMany({
                    select: selectedDataUser,
                });
                return [2 /*return*/, users];
            });
        });
    };
    //Finds a user by id.
    UserService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.user.findUnique({
                            where: {
                                id: id,
                            },
                            select: selectedDataUser,
                        })];
                    case 1:
                        foundUser = _a.sent();
                        console.log(foundUser);
                        if (!foundUser)
                            throw boom.notFound("user not found");
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    //Finds a user by email.
    UserService.prototype.findUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.user.findUnique({ where: { email: email } })];
                    case 1:
                        foundUser = _a.sent();
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    //Updates a user by id.
    UserService.prototype.update = function (id, changes) {
        return __awaiter(this, void 0, void 0, function () {
            var updateUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.user.update({
                            where: { id: id },
                            data: changes,
                            select: selectedDataUser,
                        })];
                    case 1:
                        updateUser = _a.sent();
                        if (!updateUser)
                            throw boom.notFound("user not found");
                        return [2 /*return*/, updateUser];
                }
            });
        });
    };
    UserService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db.user.delete({
                                where: { id: id },
                                select: selectedDataUser,
                            })];
                    case 2:
                        deleteUser = _a.sent();
                        return [2 /*return*/, deleteUser];
                }
            });
        });
    };
    return UserService;
}());
export { UserService };
//# sourceMappingURL=users.service.js.map