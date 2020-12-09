"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var EditUser_1 = require("../EditUser/EditUser");
var EditCustomer_1 = require("./EditCustomer");
var EditLocation_1 = require("../Location/EditLocation");
var Location_1 = require("../Location/Location");
var Customer = function () {
    var _a = react_1.useContext(Context_1.AtucasaContext), currentUser = _a.currentUser, location = _a.location, handleCurrentUser = _a.handleCurrentUser;
    var _b = react_1.useState(null), currentCustomer = _b[0], setCurrentCustomer = _b[1];
    var handleCurrentCustomer = function () {
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
            handleCurrentUser();
        })["catch"](console.error);
    };
    react_1.useEffect((handleCurrentCustomer), []);
    console.log(currentUser);
    console.log(currentCustomer);
    console.log(location);
    return (react_1["default"].createElement(react_1["default"].Fragment, null, (currentUser && currentCustomer && location) && (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Customer"),
        react_1["default"].createElement(EditUser_1["default"], null),
        react_1["default"].createElement(EditCustomer_1["default"], { handleCurrentCustomer: handleCurrentCustomer }),
        react_1["default"].createElement(EditLocation_1["default"], null),
        react_1["default"].createElement("h2", null, "User information"),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Email: "),
            currentUser.email),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Role: "),
            currentUser.role),
        react_1["default"].createElement("h2", null, "Personal information"),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Username: "),
            currentCustomer.username),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "First Name: "),
            currentCustomer.first_name),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Last Name: "),
            currentCustomer.last_name),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Slug: "),
            currentCustomer.slug),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Phone Number: "),
            currentCustomer.phone_number),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Profile Picture: "),
            currentCustomer.profile_picture),
        react_1["default"].createElement(Location_1["default"], null)))));
};
exports["default"] = Customer;
