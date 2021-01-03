"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_leaflet_1 = require("react-leaflet");
var Place = function (_a) {
    var merchant = _a.merchant;
    var _b = merchant.location, latitude = _b.latitude, longitude = _b.longitude;
    var merchant_name = merchant.merchant_info.merchant_name;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, (latitude && longitude) && (react_1["default"].createElement(react_leaflet_1.Circle, { center: [latitude, longitude], radius: 14, pathOptions: {
            fillColor: "#a00",
            color: "#a00",
            weight: 6
        } },
        react_1["default"].createElement(react_leaflet_1.Popup, null,
            react_1["default"].createElement("p", null, "" + merchant_name))))));
};
exports["default"] = Place;
