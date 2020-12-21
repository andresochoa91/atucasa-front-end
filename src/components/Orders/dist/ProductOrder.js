"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ProductOrder = function (_a) {
    var product = _a.product, currentUser = _a.currentUser, currentRole = _a.currentRole, orderAccepted = _a.orderAccepted, orderCanceled = _a.orderCanceled;
    var _b = react_1.useState(product.amount), currentAmount = _b[0], setCurrentAmount = _b[1];
    return (react_1["default"].createElement("tr", { key: product.id },
        react_1["default"].createElement("td", null, product.product_name),
        react_1["default"].createElement("td", null,
            "$",
            (product.price).toFixed(2)),
        react_1["default"].createElement("td", { style: { color: product.amount !== currentAmount ? "#f00" : "#000" } },
            (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" &&
                currentRole === "merchant" &&
                !orderAccepted &&
                !orderCanceled &&
                (react_1["default"].createElement("button", { onClick: function () { return currentAmount > 1 && setCurrentAmount(currentAmount - 1); } }, "-")),
            currentAmount,
            (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" &&
                currentRole === "merchant" &&
                !orderAccepted &&
                !orderCanceled &&
                (react_1["default"].createElement("button", { onClick: function () { return currentAmount < product.amount && setCurrentAmount(currentAmount + 1); } }, "+"))),
        react_1["default"].createElement("td", null,
            "$",
            (product.tax).toFixed(2)),
        react_1["default"].createElement("td", null,
            "$",
            Number(((product.price + product.tax) * currentAmount).toFixed(2))),
        (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" &&
            currentRole === "merchant" &&
            !orderAccepted &&
            !orderCanceled &&
            (react_1["default"].createElement(react_1["default"].Fragment, null,
                currentAmount === product.amount ? (react_1["default"].createElement("td", null,
                    react_1["default"].createElement("button", null, "Confirm"))) : (react_1["default"].createElement("td", null,
                    react_1["default"].createElement("button", null, "Suggest amount"))),
                react_1["default"].createElement("td", null,
                    react_1["default"].createElement("button", null, "Not Available"))))));
};
exports["default"] = ProductOrder;
