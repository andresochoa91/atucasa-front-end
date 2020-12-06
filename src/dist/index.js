"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var App_1 = require("./App");
var reportWebVitals_1 = require("./reportWebVitals");
var Context_1 = require("./Context");
react_dom_1["default"].render(react_1["default"].createElement(react_1["default"].StrictMode, null,
    react_1["default"].createElement(Context_1.Provider, null,
        react_1["default"].createElement(App_1["default"], null))), document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals_1["default"]();
