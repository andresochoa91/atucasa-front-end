"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var SignUp = function () {
    var handleCurrentUser = react_1.useContext(Context_1.AtucasaContext).handleCurrentUser;
    var _a = react_1.useState("h@v.com"), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState("123456789"), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState("123456789"), passwordConfirmation = _c[0], setPasswordConfirmation = _c[1];
    var _d = react_1.useState("customer"), role = _d[0], setRole = _d[1];
    var handleInput = function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        (name === "email" ? setEmail :
            name === "password" ? setPassword :
                setPasswordConfirmation)(value);
    };
    var handleRole = function (event) {
        event.preventDefault();
        setRole(event.currentTarget.value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        // fetch("https://atucasa-api.herokuapp.com/signup", {
        fetch(process.env.REACT_APP_API + "/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                role: role
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (!data.error) {
                handleCurrentUser();
            }
            else {
                console.log(data);
            }
        })["catch"](console.error);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Sign Up"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement("label", null, "Email"),
            react_1["default"].createElement("input", { type: "email", placeholder: "email", name: "email", value: email, onChange: handleInput, required: true }),
            react_1["default"].createElement("label", null, "Password"),
            react_1["default"].createElement("input", { type: "password", placeholder: "password", name: "password", value: password, onChange: handleInput, required: true }),
            react_1["default"].createElement("label", null, "Password Confirmation"),
            react_1["default"].createElement("input", { type: "password", placeholder: "password confirmation", name: "passwordConfirmation", value: passwordConfirmation, onChange: handleInput, required: true }),
            react_1["default"].createElement("label", null, "Role"),
            react_1["default"].createElement("select", { name: "role", id: "role" },
                react_1["default"].createElement("option", { value: "customer", onClick: handleRole }, "Customer"),
                react_1["default"].createElement("option", { value: "merchant", onClick: handleRole }, "Merchant")),
            react_1["default"].createElement("input", { type: "submit" }))));
};
exports["default"] = SignUp;
