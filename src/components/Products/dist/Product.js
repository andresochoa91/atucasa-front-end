"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Product = function (_a) {
    var product = _a.product;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Product Name: "),
            product.product_name),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Description: "),
            product.description),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Price: "),
            product.price),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Available: "),
            product.available ? "yes" : "no"),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Product_picture: "),
            product.product_picture),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Tax: "),
            product.tax),
        react_1["default"].createElement("br", null)));
};
exports["default"] = Product;
