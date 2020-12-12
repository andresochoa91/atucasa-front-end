"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ShowMerchant_1 = require("./ShowMerchant");
var ShowMerchants = function () {
    var _a = react_1.useState([]), merchants = _a[0], setMerchants = _a[1];
    react_1.useEffect(function () {
        fetch(process.env.REACT_APP_API + "/merchants", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setMerchants(data.merchants);
        });
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Merchants"),
        merchants.map(function (merchant) {
            return (react_1["default"].createElement("div", { key: merchant.merchant_info.user_id },
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("strong", null, "Merchant Name"),
                    ": ",
                    merchant.merchant_info.merchant_name),
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("strong", null, "Description"),
                    ": ",
                    merchant.merchant_info.description),
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("strong", null, "Phone Number"),
                    ": ",
                    merchant.merchant_info.phone_number),
                react_1["default"].createElement(ShowMerchant_1["default"], { merchant: merchant }),
                react_1["default"].createElement("br", null)));
        })));
};
exports["default"] = ShowMerchants;
