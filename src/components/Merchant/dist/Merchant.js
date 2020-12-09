"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var EditUser_1 = require("../EditUser/EditUser");
var EditMerchant_1 = require("./EditMerchant");
var Merchant = function () {
    var currentUser = react_1.useContext(Context_1.AtucasaContext).currentUser;
    var _a = react_1.useState(null), currentMerchant = _a[0], setCurrentMerchant = _a[1];
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
    react_1.useEffect(function () {
        handleCurrentMerchant();
    }, []);
    console.log(currentUser);
    console.log(currentMerchant);
    return (react_1["default"].createElement(react_1["default"].Fragment, null, (currentUser && currentMerchant) && (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Merchant"),
        react_1["default"].createElement(EditUser_1["default"], null),
        react_1["default"].createElement(EditMerchant_1["default"], { handleCurrentMerchant: handleCurrentMerchant }),
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
            currentMerchant.background_picture)))));
};
exports["default"] = Merchant;
