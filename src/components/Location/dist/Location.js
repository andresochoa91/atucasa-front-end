"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var Location = function () {
    var location = react_1.useContext(Context_1.AtucasaContext).location;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, location &&
        react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("h2", null, "Location"),
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "Country: "),
                location.country),
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "State: "),
                location.state),
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "City: "),
                location.city),
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "Address: "),
                location.address),
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "Zip Code: "),
                location.zip_code),
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, "Details: "),
                location.details))));
};
exports["default"] = Location;
