var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { db } from '../utils/db/db.server';
import boom from '@hapi/boom';
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    //Finds all users.
    ProductService.prototype.findAll = function (offset, limit, categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var products, options, startIndex, endIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {};
                        if (!(offset || limit)) return [3 /*break*/, 2];
                        startIndex = parseInt(offset) || 0;
                        endIndex = parseInt(limit) || 10;
                        categoryId
                            ? (options = {
                                skip: startIndex,
                                take: endIndex,
                                where: { categoryId: categoryId },
                                include: { images: true },
                            })
                            : (options = {
                                skip: startIndex,
                                take: endIndex,
                                include: { images: true },
                            });
                        return [4 /*yield*/, db.product.findMany(options)];
                    case 1:
                        products = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        categoryId
                            ? (options = {
                                where: { categoryId: categoryId },
                                include: { images: true },
                            })
                            : (options = {
                                include: { images: true },
                            });
                        return [4 /*yield*/, db.product.findMany(options)];
                    case 3:
                        products = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (products.length <= 0)
                            throw boom.notFound('products not found');
                        return [2 /*return*/, products];
                }
            });
        });
    };
    //Finds a user by id.
    ProductService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.product.findUnique({
                            where: {
                                id: id,
                            },
                            include: { images: true },
                        })];
                    case 1:
                        foundProduct = _a.sent();
                        if (!foundProduct)
                            throw boom.notFound('product not found');
                        return [2 /*return*/, foundProduct];
                }
            });
        });
    };
    ProductService.prototype.create = function (dataProduct, imagesData) {
        return __awaiter(this, void 0, void 0, function () {
            var newProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.product.create({
                            data: __assign(__assign({}, dataProduct), { categoryId: parseInt(dataProduct.categoryId), images: {
                                    create: imagesData,
                                } }),
                            include: { images: true },
                        })];
                    case 1:
                        newProduct = _a.sent();
                        return [2 /*return*/, newProduct];
                }
            });
        });
    };
    ProductService.prototype.update = function (id, changes) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.product.update({
                            where: { id: id },
                            data: changes,
                        })];
                    case 1:
                        updatedProduct = _a.sent();
                        if (!updatedProduct)
                            throw boom.notFound('product not found');
                        return [2 /*return*/, updatedProduct];
                }
            });
        });
    };
    ProductService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //Verify if the product exists
                    return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        //Verify if the product exists
                        _a.sent();
                        return [4 /*yield*/, db.product.delete({
                                where: { id: id },
                            })];
                    case 2:
                        deletedProduct = _a.sent();
                        return [2 /*return*/, deletedProduct];
                }
            });
        });
    };
    return ProductService;
}());
export { ProductService };
//# sourceMappingURL=products.service.js.map