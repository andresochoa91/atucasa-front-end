"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ProductOrder = function (_a) {
    var product = _a.product, currentUser = _a.currentUser, currentRole = _a.currentRole, orderAccepted = _a.orderAccepted, orderCanceled = _a.orderCanceled;
    var _b = react_1.useState(product.amount), currentAmount = _b[0], setCurrentAmount = _b[1];
    var _c = react_1.useState(true), available = _c[0], setAvailable = _c[1];
    var _d = react_1.useState(false), updated = _d[0], setUpdated = _d[1];
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
                updated ? "#ff0" : "#fff")
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
                (react_1["default"].createElement("button", { onClick: function () {
                        if ((currentAmount > 1) && available) {
                            setCurrentAmount(currentAmount - 1);
                            setUpdated(true);
                        }
                    } }, "-")),
            currentAmount,
            (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" &&
                currentRole === "merchant" &&
                !orderAccepted &&
                !orderCanceled &&
                (react_1["default"].createElement("button", { onClick: function () {
                        if ((currentAmount < product.amount) && available) {
                            if (currentAmount + 1 === product.amount) {
                                setUpdated(false);
                            }
                            setCurrentAmount(currentAmount + 1);
                        }
                    } }, "+"))),
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
