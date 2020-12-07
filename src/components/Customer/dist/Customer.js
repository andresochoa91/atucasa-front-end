"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var EditUser_1 = require("../EditUser/EditUser");
var EditCustomer_1 = require("./EditCustomer");
var Customer = function () {
    var currentUser = react_1.useContext(Context_1.AtucasaContext).currentUser;
    var _a = react_1.useState(null), currentCustomer = _a[0], setCurrentCustomer = _a[1];
    react_1.useEffect(function () {
        fetch("http://localhost:3000/current_user/customer", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setCurrentCustomer(data.customer);
        })["catch"](console.error);
    }, [currentUser]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Customer"),
        react_1["default"].createElement(EditUser_1["default"], null),
        react_1["default"].createElement(EditCustomer_1["default"], null),
        react_1["default"].createElement("h2", null, "Personal information"),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Email: "),
            currentUser && currentUser.email),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Role: "),
            currentUser && currentUser.role),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Full Name: "),
            currentCustomer && currentCustomer.first_name + " " + currentCustomer.last_name),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Slug: "),
            currentCustomer && currentCustomer.slug),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Phone Number: "),
            currentCustomer && currentCustomer.phone_number),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Profile Picture: "),
            currentCustomer && currentCustomer.profile_picture)));
};
exports["default"] = Customer;
