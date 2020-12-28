"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ProductOrder = function (_a) {
    var product = _a.product, currentUser = _a.currentUser, currentRole = _a.currentRole, orderAccepted = _a.orderAccepted, orderCanceled = _a.orderCanceled, acceptance = _a.acceptance, setAcceptance = _a.setAcceptance, index = _a.index, lastStage = _a.lastStage;
    var _b = react_1.useState(product.amount), currentAmount = _b[0], setCurrentAmount = _b[1];
    var _c = react_1.useState(product.available), available = _c[0], setAvailable = _c[1];
    var _d = react_1.useState(product.amount_changed), amountChanged = _d[0], setAmountChanged = _d[1];
    react_1.useEffect(function () {
        if (lastStage) {
            fetch(process.env.REACT_APP_API + "/products_order/" + product.id, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: available ? currentAmount : 0,
                    amount_changed: available ? amountChanged : false,
                    available: available
                })
            })
                .then(function (response) { return response.json(); })
                .then(console.log)["catch"](console.error);
        }
    }, [lastStage, product.id, available, currentAmount, amountChanged]);
    return (react_1["default"].createElement("tr", { style: {
            backgroundColor: (!available ? "#f00" :
                amountChanged ? "#ff0" : "#fff")
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
                            setAmountChanged(true);
                            setAcceptance(acceptance.map(function (v, i) {
                                if (i === index)
                                    return false;
                                return v;
                            }));
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
                                setAmountChanged(false);
                                setAcceptance(acceptance.map(function (v, i) {
                                    if (i === index)
                                        return true;
                                    return v;
                                }));
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
        (!orderAccepted && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" && currentRole === "merchant") ? (react_1["default"].createElement("td", null,
            react_1["default"].createElement("button", { onClick: function () {
                    setAcceptance(acceptance.map(function (v, i) {
                        if ((i === index) && !amountChanged) {
                            return !available;
                        }
                        return v;
                    }));
                    setAvailable(!available);
                } }, available ? "Not Available" : "Available"))) : (!orderAccepted &&
            (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "customer" &&
            currentRole === "customer" &&
            !orderCanceled) && (react_1["default"].createElement(react_1["default"].Fragment, null, !available ? (react_1["default"].createElement("td", null, "Not available")) : amountChanged ? (react_1["default"].createElement("td", null, "Amount suggested by merchant")) : (react_1["default"].createElement("td", null, "Available"))))));
};
exports["default"] = ProductOrder;
