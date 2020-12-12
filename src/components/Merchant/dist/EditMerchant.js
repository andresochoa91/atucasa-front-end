"use strict";
exports.__esModule = true;
var react_1 = require("react");
;
var EditMerchant = function (_a) {
    var handleCurrentMerchant = _a.handleCurrentMerchant;
    var _b = react_1.useState(""), merchantName = _b[0], setMerchantName = _b[1];
    var _c = react_1.useState(""), phoneNumber = _c[0], setPhoneNumber = _c[1];
    var _d = react_1.useState(""), taxId = _d[0], setTaxId = _d[1];
    var _e = react_1.useState(""), description = _e[0], setDescription = _e[1];
    var _f = react_1.useState(""), profilePicture = _f[0], setProfilePicture = _f[1];
    var _g = react_1.useState(""), backgroundPicture = _g[0], setBackgroundPicture = _g[1];
    var handleInput = function (event) {
        event.preventDefault();
        var _a = event.target, name = _a.name, value = _a.value;
        (name === "merchantName" ?
            setMerchantName :
            name === "phoneNumber" ?
                setPhoneNumber :
                name === "taxId" ?
                    setTaxId :
                    name === "description" ?
                        setDescription :
                        name === "profilePicture" ?
                            setProfilePicture :
                            setBackgroundPicture)(value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        var newDataMerchant = {};
        if (merchantName)
            newDataMerchant.merchant_name = merchantName;
        if (phoneNumber)
            newDataMerchant.phone_number = phoneNumber;
        if (taxId)
            newDataMerchant.tax_id = taxId;
        if (description)
            newDataMerchant.description = description;
        if (profilePicture)
            newDataMerchant.profile_picture = profilePicture;
        if (backgroundPicture)
            newDataMerchant.background_picture = backgroundPicture;
        fetch(process.env.REACT_APP_API + "/current_user/merchant", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDataMerchant)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            if (!data.error) {
                setMerchantName("");
                setPhoneNumber("");
                setTaxId("");
                setDescription("");
                setProfilePicture("");
                setBackgroundPicture("");
                handleCurrentMerchant();
            }
        })["catch"](console.error);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Edit Merchant"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement("label", null, "Merchant Name"),
            react_1["default"].createElement("input", { type: "text", name: "merchantName", value: merchantName, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Phone Number"),
            react_1["default"].createElement("input", { type: "text", name: "phoneNumber", value: phoneNumber, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Tax ID"),
            react_1["default"].createElement("input", { type: "text", name: "taxId", value: taxId, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Description"),
            react_1["default"].createElement("input", { type: "text", name: "description", value: description, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Profile Picture"),
            react_1["default"].createElement("input", { type: "text", name: "profilePicture", value: profilePicture, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Background Picture"),
            react_1["default"].createElement("input", { type: "text", name: "backgroundPicture", value: backgroundPicture, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("input", { type: "submit", value: "Update" })),
        react_1["default"].createElement("br", null)));
};
exports["default"] = EditMerchant;
