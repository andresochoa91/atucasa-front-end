"use strict";
exports.__esModule = true;
var react_1 = require("react");
var EditUser_1 = require("../EditUser/EditUser");
var EditMerchant_1 = require("../Merchant/EditMerchant");
var Merchant = function () {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Merchant"),
        react_1["default"].createElement(EditUser_1["default"], null),
        react_1["default"].createElement(EditMerchant_1["default"], null)));
};
exports["default"] = Merchant;
