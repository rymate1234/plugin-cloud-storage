"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendWebpackConfig = void 0;
var path_1 = __importDefault(require("path"));
var extendWebpackConfig = function (existingWebpackConfig) {
    var _a;
    var newConfig = __assign(__assign({}, existingWebpackConfig), { resolve: __assign(__assign({}, (existingWebpackConfig.resolve || {})), { alias: __assign(__assign({}, (((_a = existingWebpackConfig.resolve) === null || _a === void 0 ? void 0 : _a.alias) ? existingWebpackConfig.resolve.alias : {})), { '@azure/storage-blob': path_1.default.resolve(__dirname, './mock.js') }) }) });
    return newConfig;
};
exports.extendWebpackConfig = extendWebpackConfig;
//# sourceMappingURL=webpack.js.map