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
var CreateLink_1 = require("./CreateLink");
var Link_1 = require("./Link");
var Links = function () {
    var _a = react_1.useState([]), links = _a[0], setLinks = _a[1];
    var handleLinks = function () {
        fetch("http://localhost:3000/current_user/links", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setLinks(__spreadArrays(data.links));
        })["catch"](console.error);
    };
    react_1.useEffect(handleLinks, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Links"),
        links.map(function (link) { return (react_1["default"].createElement(Link_1["default"], { link: link, key: link.id })); }),
        react_1["default"].createElement(CreateLink_1["default"], { handleLinks: handleLinks })));
};
exports["default"] = Links;
