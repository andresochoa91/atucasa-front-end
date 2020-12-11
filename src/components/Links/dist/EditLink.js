"use strict";
exports.__esModule = true;
var react_1 = require("react");
var EditLink = function (_a) {
    var handleMode = _a.handleMode, handleLinks = _a.handleLinks, link = _a.link;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "In Edit Mode"),
        react_1["default"].createElement("button", { onClick: handleMode }, "Cancel")));
};
exports["default"] = EditLink;
