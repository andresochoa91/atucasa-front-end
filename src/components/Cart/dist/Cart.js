"use strict";
exports.__esModule = true;
var react_1 = require("react");
;
;
;
var Cart = function (_a) {
    var currentCustomerID = _a.currentCustomerID, merchantID = _a.merchantID, cart = _a.cart, setCart = _a.setCart;
    var _b = react_1.useState(""), tip = _b[0], setTip = _b[1];
    var _c = react_1.useState(0), total = _c[0], setTotal = _c[1];
    var handleTip = function (event) {
        setTip(event.target.value);
    };
    var handleSuggestedTip = function () {
        setTip((total * 0.15).toFixed(2));
    };
    react_1.useEffect(function () {
        setTotal(cart.reduce(function (acc, pr) {
            return acc + ((pr.tax + pr.unitPrice) * pr.amount);
        }, 0));
    }, [cart, tip]);
    var handleCheckout = function () {
        if (tip !== "" && (Number(tip) >= 0)) {
            var checkout = {
                accepted: true,
                current_user: "merchant",
                tip: Number(tip),
                delivery_fee: 5,
                products: cart.map(function (pr) {
                    return {
                        id: pr.id,
                        amount: pr.amount
                    };
                })
            };
            if (currentCustomerID)
                checkout.customer_id = currentCustomerID;
            if (merchantID)
                checkout.merchant_id = merchantID;
            fetch(process.env.REACT_APP_API + "/merchants/" + merchantID + "/create_order", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkout)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                setCart([]);
                setTip("");
            })["catch"](console.error);
        }
        else {
            console.log("Add a correct tip");
        }
    };
    var handleAmount = function (sign, cID) {
        setCart(cart.map(function (pr, id) {
            if (sign === "-") {
                if (id === cID && pr.amount > 1) {
                    pr.amount--;
                }
            }
            else if (sign === "+") {
                if (id === cID && pr.amount < 20) {
                    pr.amount++;
                }
            }
            return pr;
        }));
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h3", null, "Cart:"),
        react_1["default"].createElement("table", { style: { textAlign: "center" } },
            react_1["default"].createElement("thead", null,
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("th", null, "Product name"),
                    react_1["default"].createElement("th", null, "Unit Price"),
                    react_1["default"].createElement("th", null, "Amount"),
                    react_1["default"].createElement("th", null, "Unit Tax"),
                    react_1["default"].createElement("th", null, "Semi Total"))),
            react_1["default"].createElement("tbody", null,
                cart.map(function (cartProduct, cID) { return (react_1["default"].createElement("tr", { key: cID },
                    react_1["default"].createElement("td", null, cartProduct.productName),
                    react_1["default"].createElement("td", null,
                        "$",
                        cartProduct.unitPrice),
                    react_1["default"].createElement("td", null,
                        react_1["default"].createElement("button", { onClick: function () { return handleAmount("-", cID); } }, "-"),
                        cartProduct.amount,
                        react_1["default"].createElement("button", { onClick: function () { return handleAmount("+", cID); } }, "+")),
                    react_1["default"].createElement("td", null,
                        "$",
                        cartProduct.tax.toFixed(2)),
                    react_1["default"].createElement("td", null,
                        "$",
                        ((cartProduct.tax + cartProduct.unitPrice) * cartProduct.amount).toFixed(2)),
                    react_1["default"].createElement("td", null,
                        react_1["default"].createElement("button", { onClick: function () { return setCart(cart.filter(function (pr, id) { return id !== cID; })); } }, "X")))); }),
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("td", null),
                    react_1["default"].createElement("td", null),
                    react_1["default"].createElement("td", null),
                    react_1["default"].createElement("td", null,
                        react_1["default"].createElement("strong", null, "Tip")),
                    react_1["default"].createElement("td", null,
                        "$",
                        react_1["default"].createElement("input", { type: "text", value: tip, placeholder: "Suggested: " + (total * 0.15).toFixed(2), onChange: handleTip })),
                    react_1["default"].createElement("td", null,
                        react_1["default"].createElement("button", { onClick: handleSuggestedTip }, "Apply suggested tip"))),
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("td", null),
                    react_1["default"].createElement("td", null),
                    react_1["default"].createElement("td", null),
                    react_1["default"].createElement("td", null,
                        react_1["default"].createElement("strong", null, "Delivery Fee")),
                    react_1["default"].createElement("td", null, "$5")),
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("td", null),
                    react_1["default"].createElement("td", null),
                    react_1["default"].createElement("td", null),
                    react_1["default"].createElement("td", null,
                        react_1["default"].createElement("strong", null, "Total")),
                    react_1["default"].createElement("td", null,
                        react_1["default"].createElement("strong", null,
                            "$",
                            (total + Number(tip) + 5).toFixed(2)))))),
        react_1["default"].createElement("button", { onClick: handleCheckout }, "Checkout")));
};
exports["default"] = Cart;
