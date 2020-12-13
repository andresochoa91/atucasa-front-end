"use strict";
exports.__esModule = true;
var react_1 = require("react");
;
var ShowMerchant = function (_a) {
    var merchant = _a.merchant;
    var _b = merchant.location, country = _b.country, state = _b.state, city = _b.city, address = _b.address;
    var _c = react_1.useState(false), showProducts = _c[0], setShowProducts = _c[1];
    return (react_1["default"].createElement("div", { key: merchant.merchant_info.id },
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Email"),
            ": ",
            merchant.email),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Location"),
            ": ", country + ", " + state + ", " + city + ", " + address + "."),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("h3", null, "Links"),
        merchant.links.map(function (link) { return (react_1["default"].createElement("div", { key: link.id },
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("strong", null, link.site_name),
                ": ",
                link.url))); }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("h3", null, "Products"),
        react_1["default"].createElement("button", { onClick: function () { return setShowProducts(!showProducts); } }, showProducts ? "Do not show products" : "Show products"),
        showProducts &&
            merchant.products.map(function (product) { return (react_1["default"].createElement("div", { key: product.id },
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("strong", null, "Product Name"),
                    ": ",
                    product.product_name),
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("strong", null, "Description"),
                    ": ",
                    product.description),
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("strong", null, "Price"),
                    ": ",
                    product.price),
                react_1["default"].createElement("br", null))); })));
};
exports["default"] = ShowMerchant;
