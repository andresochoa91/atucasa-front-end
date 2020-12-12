"use strict";
exports.__esModule = true;
var react_1 = require("react");
var EditLink_1 = require("./EditLink");
var DeleteLink_1 = require("./DeleteLink");
var Link = function (_a) {
    var link = _a.link, handleLinks = _a.handleLinks;
    var _b = react_1.useState(false), inEditMode = _b[0], setInEditMode = _b[1];
    var handleMode = function () {
        setInEditMode(!inEditMode);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null, inEditMode ?
        react_1["default"].createElement(EditLink_1["default"], { handleMode: handleMode, link: link, handleLinks: handleLinks }) :
        react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "Site Name: "),
                link.site_name),
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "Url: "),
                link.url),
            react_1["default"].createElement("button", { onClick: handleMode }, "Edit"),
            react_1["default"].createElement(DeleteLink_1["default"], { link: link, handleLinks: handleLinks }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("br", null))));
};
exports["default"] = Link;
