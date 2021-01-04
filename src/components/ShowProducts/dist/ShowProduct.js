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
var ShowProduct = function (_a) {
    var product = _a.product, setCart = _a.setCart, cart = _a.cart;
    var _b = react_1.useState(1), amount = _b[0], setAmount = _b[1];
    var checkProductId = (cart.filter(function (pr) { return pr.id === product.id; })).length;
    var handleCart = function () {
        if (!checkProductId) {
            setCart(__spreadArrays(cart, [{
                    productName: product.product_name,
                    unitPrice: product.price,
                    amount: amount,
                    tax: product.tax,
                    id: product.id
                }]));
            setAmount(1);
        }
        else {
            console.log("Product already in the cart");
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        checkProductId ? (react_1["default"].createElement("p", { style: { color: "#0a0" } },
            react_1["default"].createElement("strong", null, "Product in Cart"))) : react_1["default"].createElement(react_1["default"].Fragment, null),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Product Name"),
            ": ",
            product.product_name),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Description"),
            ": ",
            product.description),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Unit Price"),
            ": ",
            product.price),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Category"),
            ": ",
            product.category),
        !checkProductId && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "Amount"),
                ":",
                react_1["default"].createElement("button", { onClick: function () { return (amount > 1) ? setAmount(amount - 1) : amount; } }, "-"),
                amount,
                react_1["default"].createElement("button", { onClick: function () { return (amount < 20) ? setAmount(amount + 1) : amount; } }, "+")),
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "Total price: $"),
                amount * product.price),
            react_1["default"].createElement("button", { onClick: handleCart }, "Add to cart"))),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null)));
};
exports["default"] = ShowProduct;
