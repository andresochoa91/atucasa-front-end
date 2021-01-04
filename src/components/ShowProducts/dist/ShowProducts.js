"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Cart_1 = require("../Cart/Cart");
var ShowProduct_1 = require("../ShowProducts/ShowProduct");
;
var ShowProducts = function (_a) {
    var products = _a.products, merchantID = _a.merchantID, currentCustomerID = _a.currentCustomerID;
    var _b = react_1.useState([]), cart = _b[0], setCart = _b[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        products.map(function (product) { return (product.available && (react_1["default"].createElement("div", { key: product.id },
            react_1["default"].createElement(ShowProduct_1["default"], { cart: cart, setCart: setCart, product: product }),
            react_1["default"].createElement("br", null)))); }),
        react_1["default"].createElement(Cart_1["default"], { cart: cart, setCart: setCart, merchantID: merchantID, currentCustomerID: currentCustomerID })));
};
exports["default"] = ShowProducts;
