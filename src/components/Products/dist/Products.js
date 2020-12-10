"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var CreateProduct_1 = require("./CreateProduct");
var Products = function () {
    var _a = react_1.useState([]), products = _a[0], setProducts = _a[1];
    var handleProducts = function () {
        fetch("http://localhost:3000/current_user/products", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setProducts(__spreadArrays(data.products));
        })["catch"](console.error);
    };
    react_1.useEffect(handleProducts, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Products"),
        products.map(function (product) { return (react_1["default"].createElement("div", { key: product.id },
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
            react_1["default"].createElement("br", null))); }),
        react_1["default"].createElement(CreateProduct_1["default"], { handleProducts: handleProducts })));
};
exports["default"] = Products;
