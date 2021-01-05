"use strict";
exports.__esModule = true;
var react_1 = require("react");
var UploadImage_1 = require("./UploadImage");
var UpdateImage = function (_a) {
    var currentPicture = _a.currentPicture, userName = _a.userName, handleInput = _a.handleInput, newPicture = _a.newPicture, setNewPicture = _a.setNewPicture;
    var _b = react_1.useState(false), copyUrl = _b[0], setCopyUrl = _b[1];
    var _c = react_1.useState(false), uploadImage = _c[0], setUploadImage = _c[1];
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("img", { src: newPicture ? newPicture : currentPicture, alt: "img", height: 200 }),
        react_1["default"].createElement("br", null),
        newPicture && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("button", { onClick: function () { return setNewPicture(""); } }, "Keep original image"),
            react_1["default"].createElement("br", null))),
        !uploadImage && (react_1["default"].createElement("button", { onClick: function (event) {
                event.preventDefault();
                setCopyUrl(!copyUrl);
                setUploadImage(false);
            } }, !copyUrl ? "Copy url of the image" : "Go back")),
        !copyUrl && (react_1["default"].createElement("button", { onClick: function (event) {
                event.preventDefault();
                setUploadImage(!uploadImage);
                setCopyUrl(false);
            } }, !uploadImage ? "Upload image from Computer" : "Go back")),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null),
        copyUrl && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("label", null, "Copy url of the image"),
            react_1["default"].createElement("input", { type: "text", name: "profilePicture", value: newPicture, onChange: handleInput, placeholder: currentPicture }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("br", null))),
        uploadImage && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("label", null, "Upload image"),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(UploadImage_1["default"], { setPicture: setNewPicture, pictureName: userName }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("br", null)))));
};
exports["default"] = UpdateImage;
