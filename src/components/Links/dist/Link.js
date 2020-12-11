"use strict";
exports.__esModule = true;
var react_1 = require("react");
// import EditLink from './EditLink';
var Link = function (_a) {
    var link = _a.link /* , handleLinks */;
    var _b = react_1.useState(false), inEditMode = _b[0], setInEditMode = _b[1];
    // const handleMode = (): void => {
    //   setInEditMode(!inEditMode);
    // };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Site Name: "),
            link.site_name),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Url: "),
            link.url),
        react_1["default"].createElement("button", null, "Edit"),
        react_1["default"].createElement("button", null, "Delete"),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null)));
};
exports["default"] = Link;
