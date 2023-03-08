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
import { ProductService } from '../services/products.service';
import { ImagesService } from '../services/images.service';
var productService = new ProductService();
var imageService = new ImagesService();
export var listProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, offset, limit, categoryId, products, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, offset = _a.offset, limit = _a.limit, categoryId = _a.categoryId;
                return [4 /*yield*/, productService.findAll(offset, limit, parseInt(categoryId.toString()))];
            case 1:
                products = _b.sent();
                res.json({ status: '200', message: 'products found', data: products });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, productService.findOne(parseInt(id))];
            case 1:
                product = _a.sent();
                res.json({ statusCode: '200', message: 'product found', data: product });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productInfo, files, _a, id, name_1, webViewLink, responseImages, newProduct, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                productInfo = req.body;
                files = Object.values(req.files).flat();
                return [4 /*yield*/, imageService.folder("".concat(Date.now(), "-").concat(productInfo.name))];
            case 1:
                _a = _b.sent(), id = _a.id, name_1 = _a.name, webViewLink = _a.webViewLink;
                return [4 /*yield*/, imageService.upload(files, id)];
            case 2:
                responseImages = _b.sent();
                return [4 /*yield*/, productService.create(__assign(__assign({}, productInfo), { folderId: id, urlFolder: webViewLink, isEnable: true }), responseImages)];
            case 3:
                newProduct = _b.sent();
                res.status(201).json({
                    statusCode: 201,
                    message: 'created new product',
                    data: newProduct,
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var updateProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, changes, updatedProduct, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                changes = req.body;
                return [4 /*yield*/, productService.update(parseInt(id), changes)];
            case 1:
                updatedProduct = _a.sent();
                res.json({
                    statusCode: '200',
                    message: 'product updated',
                    data: updatedProduct,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var deleteProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedProduct, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, productService.delete(parseInt(id))];
            case 1:
                deletedProduct = _a.sent();
                res.json({
                    statusCode: '200',
                    message: 'product deleted',
                    data: deletedProduct,
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=product.controller.js.map