"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("./Context");
var SignUp_1 = require("./components/SignUp");
var SignIn_1 = require("./components/SignIn");
var SignOut_1 = require("./components/SignOut");
var App = function () {
    var currentUser = react_1.useContext(Context_1.AtucasaContext).currentUser;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, "Welcome to atucasa.com"),
        currentUser
            ?
                react_1["default"].createElement(SignOut_1["default"], null)
            :
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(SignUp_1["default"], null),
                    react_1["default"].createElement(SignIn_1["default"], null))));
};
exports["default"] = App;
