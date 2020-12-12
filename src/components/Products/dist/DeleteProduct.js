"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DeleteProduct = function (_a) {
    var product = _a.product, handleProducts = _a.handleProducts;
    var handleDelete = function () {
        if (window.confirm("are you sure?")) {
            fetch("http://localhost:3000/current_user/products/" + product.id, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                handleProducts();
            })["catch"](console.error);
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("button", { onClick: handleDelete }, "Delete")));
};
exports["default"] = DeleteProduct;
