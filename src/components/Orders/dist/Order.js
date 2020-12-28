"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var ProductOrder_1 = require("./ProductOrder");
var Order = function (_a) {
    var order = _a.order;
    var currentUser = react_1.useContext(Context_1.AtucasaContext).currentUser;
    var _b = react_1.useState(order.accepted), orderAccepted = _b[0], setOrderAccepted = _b[1];
    var _c = react_1.useState(order.canceled), orderCanceled = _c[0], setOrderCanceled = _c[1];
    var _d = react_1.useState(order.current_user), currentRole = _d[0], setCurrentRole = _d[1];
    var _e = react_1.useState(Array(order.products_order.length).fill(true)), acceptance = _e[0], setAcceptance = _e[1];
    var _f = react_1.useState(""), message = _f[0], setMessage = _f[1];
    var handleUpdate = function (id, field) {
        ;
        var updateField = {};
        if (field === "role") {
            updateField.current_user = order.current_user === "merchant" ? "customer" : "merchant";
            updateField.message = message;
        }
        else if (field === "accepted") {
            updateField.accepted = true;
        }
        else {
            updateField.canceled = true;
        }
        fetch(process.env.REACT_APP_API + "/current_user/orders/" + id, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateField)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (field === "role") {
                setCurrentRole(data.order.current_user);
                console.log(data);
            }
            else if (field === "accepted") {
                setOrderAccepted(true);
            }
            else if (field === "canceled") {
                setOrderCanceled(true);
            }
        })["catch"](console.error);
    };
    return (react_1["default"].createElement("div", { key: order.id },
        react_1["default"].createElement("h3", null,
            "Order #",
            order.id),
        react_1["default"].createElement("table", { style: { textAlign: "center" } },
            react_1["default"].createElement("thead", null,
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("th", null, "Product name"),
                    react_1["default"].createElement("th", null, "Unit Price"),
                    react_1["default"].createElement("th", null, "Amount"),
                    react_1["default"].createElement("th", null, "Unit Tax"),
                    react_1["default"].createElement("th", null, "Semi Total"))),
            react_1["default"].createElement("tbody", null,
                order.products_order.map(function (product, index) { return (react_1["default"].createElement(ProductOrder_1["default"], { acceptance: acceptance, setAcceptance: setAcceptance, currentUser: currentUser, currentRole: currentRole, product: product, orderAccepted: orderAccepted, orderCanceled: orderCanceled, key: product.id, index: index })); }),
                ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "customer" || orderAccepted || orderCanceled) && (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("td", null),
                        react_1["default"].createElement("td", null),
                        react_1["default"].createElement("td", null),
                        react_1["default"].createElement("td", null,
                            react_1["default"].createElement("strong", null, "Tip")),
                        react_1["default"].createElement("td", null,
                            "$",
                            order.tip)),
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("td", null),
                        react_1["default"].createElement("td", null),
                        react_1["default"].createElement("td", null),
                        react_1["default"].createElement("td", null,
                            react_1["default"].createElement("strong", null, "Delivery Fee")),
                        react_1["default"].createElement("td", null,
                            "$",
                            order.delivery_fee)),
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("td", null),
                        react_1["default"].createElement("td", null),
                        react_1["default"].createElement("td", null),
                        react_1["default"].createElement("td", null,
                            react_1["default"].createElement("strong", null, "Total")),
                        react_1["default"].createElement("td", null,
                            "$",
                            (order.products_order.reduce(function (acc, pr) {
                                return (acc + ((pr.price + pr.tax) * pr.amount));
                            }, 0) + order.tip + order.delivery_fee).toFixed(2))))))),
        !orderCanceled && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "customer" && currentRole === "customer" && !orderAccepted ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("p", null, "If you accept the changes, press confirm order, if not, press Cancel Order"),
            react_1["default"].createElement("button", { onClick: function () { return handleUpdate(order.id, "accepted"); } }, "Confirm order"),
            react_1["default"].createElement("button", { onClick: function () { return handleUpdate(order.id, "canceled"); } }, "Cancel order"))) : !orderCanceled && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "customer" && currentRole === "merchant" && !orderAccepted ? (react_1["default"].createElement("p", null, "Waiting for the merchant to confirm your order.")) : !orderCanceled && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" && currentRole === "merchant" && !orderAccepted ? (react_1["default"].createElement(react_1["default"].Fragment, null, !acceptance.filter(function (v) { return !v; }).length ? (react_1["default"].createElement("button", { onClick: function () { return handleUpdate(order.id, "accepted"); } }, "Confirm order")) : (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Message"),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("textarea", { name: "message", value: message, onChange: function (event) { return setMessage(event.target.value); }, minLength: 10 }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("button", { onClick: function () { return handleUpdate(order.id, "role"); } }, "Suggest changes"))))) : !orderCanceled && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" && currentRole === "customer" && !orderAccepted ? (react_1["default"].createElement("p", null, "Waiting for the customer to confirm your order.")) : !orderCanceled && orderAccepted ? (react_1["default"].createElement("p", { style: { color: "#0a0" } }, "Order accepted")) : (react_1["default"].createElement("p", { style: { color: "#f00" } }, "Order canceled")),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null)));
};
exports["default"] = Order;
