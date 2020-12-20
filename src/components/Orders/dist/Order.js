"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var Order = function (_a) {
    var order = _a.order;
    var currentUser = react_1.useContext(Context_1.AtucasaContext).currentUser;
    var _b = react_1.useState(order.accepted), orderStatus = _b[0], setOrderStatus = _b[1];
    var _c = react_1.useState(order.canceled), orderCanceled = _c[0], setOrderCanceled = _c[1];
    var _d = react_1.useState(order.current_user), currentRole = _d[0], setCurrentRole = _d[1];
    var handleRole = function (role, id) {
        fetch(process.env.REACT_APP_API + "/current_user/orders/" + id, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                current_user: role === "merchant" ? "customer" : "merchant"
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setCurrentRole(data.order.current_user);
        })["catch"](console.error);
    };
    var handleOrderConfirmation = function (id) {
        fetch(process.env.REACT_APP_API + "/current_user/orders/" + id, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accepted: true
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setOrderStatus(true);
        })["catch"](console.error);
    };
    var handleOrderCancelation = function (id) {
        fetch(process.env.REACT_APP_API + "/current_user/orders/" + id, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                canceled: true
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setOrderCanceled(true);
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
                order.products_order.map(function (product) { return (react_1["default"].createElement("tr", { key: product.id },
                    react_1["default"].createElement("td", null, product.product_name),
                    react_1["default"].createElement("td", null,
                        "$",
                        (product.price).toFixed(2)),
                    react_1["default"].createElement("td", null, product.amount),
                    react_1["default"].createElement("td", null,
                        "$",
                        (product.tax).toFixed(2)),
                    react_1["default"].createElement("td", null,
                        "$",
                        Number(((product.price + product.tax) * product.amount).toFixed(2))))); }),
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
                        }, 0) + order.tip + order.delivery_fee).toFixed(2))))),
        !orderCanceled && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "customer" && currentRole === "customer" && !orderStatus ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("p", null, "If you accept the changes, press confirm order, if not, press Cancel Order"),
            react_1["default"].createElement("button", { onClick: function () { return handleOrderConfirmation(order.id); } }, "Confirm order"),
            react_1["default"].createElement("button", { onClick: function () { return handleOrderCancelation(order.id); } }, "Calcel order"))) : !orderCanceled && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "customer" && currentRole === "merchant" && !orderStatus ? (react_1["default"].createElement("p", null, "Waiting for the merchant to confirm your order.")) : !orderCanceled && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" && currentRole === "merchant" && !orderStatus ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("p", null, "If you have all the products, press confirm order, if not, press Suggest Changes."),
            react_1["default"].createElement("button", { onClick: function () { return handleOrderConfirmation(order.id); } }, "Confirm order"),
            react_1["default"].createElement("button", { onClick: function () { return handleRole(currentRole, order.id); } }, "Suggest changes"))) : !orderCanceled && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "merchant" && currentRole === "customer" && !orderStatus ? (react_1["default"].createElement("p", null, "Waiting for the customer to confirm your order.")) : !orderCanceled && orderStatus ? (react_1["default"].createElement("p", { style: { color: "#0a0" } }, "Order accepted")) : (react_1["default"].createElement("p", { style: { color: "#f00" } }, "Order canceled")),
        react_1["default"].createElement("br", null)));
};
exports["default"] = Order;
