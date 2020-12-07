"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("./Context");
var SignIn_1 = require("./components/SignForms/SignIn");
var SignUp_1 = require("./components/SignForms/SignUp");
var SignOut_1 = require("./components/SignForms/SignOut");
var Customer_1 = require("./components/Customer/Customer");
var Merchant_1 = require("./components/Merchant/Merchant");
var App = function () {
    var currentUser = react_1.useContext(Context_1.AtucasaContext).currentUser;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, "Welcome to atucasa.com"),
        currentUser
            ?
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(SignOut_1["default"], null),
                    currentUser.role === "customer" ?
                        react_1["default"].createElement(Customer_1["default"], null)
                        :
                            react_1["default"].createElement(Merchant_1["default"], null))
            :
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(SignIn_1["default"], null),
                    react_1["default"].createElement(SignUp_1["default"], null))));
};
exports["default"] = App;
