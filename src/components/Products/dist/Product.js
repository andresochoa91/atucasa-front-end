"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DeleteProduct_1 = require("./DeleteProduct");
var EditProduct_1 = require("./EditProduct");
var Product = function (_a) {
    var product = _a.product, handleProducts = _a.handleProducts;
    var _b = react_1.useState(false), inEditMode = _b[0], setInEditMode = _b[1];
    var handleMode = function () {
        setInEditMode(!inEditMode);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null, inEditMode ?
        react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(EditProduct_1["default"], { handleMode: handleMode, product: product, handleProducts: handleProducts }))
        :
            react_1["default"].createElement(react_1["default"].Fragment, null,
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
                react_1["default"].createElement("button", { onClick: function () { return setInEditMode(!setInEditMode); } }, "Edit"),
                react_1["default"].createElement(DeleteProduct_1["default"], { product: product, handleProducts: handleProducts }),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("br", null))));
};
exports["default"] = Product;
