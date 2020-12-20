"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var Order_1 = require("./Order");
var Orders = function () {
    // const { currentUser } = useContext<TContextProps>(AtucasaContext)
    var _a = react_1.useState([]), orders = _a[0], setOrders = _a[1];
    react_1.useEffect(function () {
        fetch(process.env.REACT_APP_API + "/current_user/orders", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setOrders(__spreadArrays(data.orders));
            console.log(data.orders);
        })["catch"](console.error);
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Orders"),
        orders.map(function (order) { return (react_1["default"].createElement(Order_1["default"], { order: order, key: order.id })); })));
};
exports["default"] = Orders;
