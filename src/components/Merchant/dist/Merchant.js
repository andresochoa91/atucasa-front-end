"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var EditUser_1 = require("../EditUser/EditUser");
var EditMerchant_1 = require("./EditMerchant");
var EditLocation_1 = require("../Location/EditLocation");
var Location_1 = require("../Location/Location");
var Links_1 = require("../Links/Links");
var Products_1 = require("../Products/Products");
var Merchant = function () {
    var _a = react_1.useContext(Context_1.AtucasaContext), currentUser = _a.currentUser, location = _a.location;
    var _b = react_1.useState(null), currentMerchant = _b[0], setCurrentMerchant = _b[1];
    var handleCurrentMerchant = function () {
        fetch("http://localhost:3000/current_user/merchant", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setCurrentMerchant(data.merchant);
        })["catch"](console.error);
    };
    react_1.useEffect(handleCurrentMerchant, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null, (currentUser && currentMerchant && location) && (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Merchant"),
        react_1["default"].createElement(EditUser_1["default"], null),
        react_1["default"].createElement(EditMerchant_1["default"], { handleCurrentMerchant: handleCurrentMerchant }),
        react_1["default"].createElement(EditLocation_1["default"], null),
        react_1["default"].createElement("h2", null, "Personal information"),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Email: "),
            currentUser.email),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Role: "),
            currentUser.role),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Merchant Name: "),
            currentMerchant.merchant_name),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Slug: "),
            currentMerchant.slug),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Phone Number: "),
            currentMerchant.phone_number),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Tax ID: "),
            currentMerchant.tax_id),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Description: "),
            currentMerchant.description),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Profile Picture: "),
            currentMerchant.profile_picture),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Background Picture: "),
            currentMerchant.background_picture),
        react_1["default"].createElement(Location_1["default"], null),
        react_1["default"].createElement(Links_1["default"], null),
        react_1["default"].createElement(Products_1["default"], null)))));
};
exports["default"] = Merchant;
