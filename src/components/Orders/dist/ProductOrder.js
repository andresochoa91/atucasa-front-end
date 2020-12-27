"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ProductOrder = function (_a) {
    var product = _a.product, currentUser = _a.currentUser, currentRole = _a.currentRole, orderAccepted = _a.orderAccepted, orderCanceled = _a.orderCanceled;
    var _b = react_1.useState(product.amount), currentAmount = _b[0], setCurrentAmount = _b[1];
    var _c = react_1.useState(true), available = _c[0], setAvailable = _c[1];
    // const handleSuggestedAmount = (): void => {
    //   fetch(`${process.env.REACT_APP_API}/product_order/${product.id}`, {
    //     method: "PUT",
    //     credentials: "include",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       amount: currentAmount
    //     })
    //   })
    // };
    return (react_1["default"].createElement("tr", { style: {
            backgroundColor: (!available ? "#f00" :
                product.amount !== currentAmount ? "#ff0" : "#fff")
        }, key: product.id },
        react_1["default"].createElement("td", null, product.product_name),
        react_1["default"].createElement("td", null,
            "$",
            (product.price).toFixed(2)),
        react_1["default"].createElement("td", null,
            (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" &&
                currentRole === "merchant" &&
                !orderAccepted &&
                !orderCanceled &&
                (react_1["default"].createElement("button", { onClick: function () { return ((currentAmount > 1) && available) && setCurrentAmount(currentAmount - 1); } }, "-")),
            currentAmount,
            (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" &&
                currentRole === "merchant" &&
                !orderAccepted &&
                !orderCanceled &&
                (react_1["default"].createElement("button", { onClick: function () { return ((currentAmount < product.amount) && available) && setCurrentAmount(currentAmount + 1); } }, "+"))),
        react_1["default"].createElement("td", null,
            "$",
            (product.tax).toFixed(2)),
        react_1["default"].createElement("td", null,
            "$",
            Number(((product.price + product.tax) * currentAmount).toFixed(2))),
        react_1["default"].createElement("td", null,
            react_1["default"].createElement("button", { onClick: function () { return setAvailable(!available); } }, available ? "Not Available" : "Available"))));
};
exports["default"] = ProductOrder;
