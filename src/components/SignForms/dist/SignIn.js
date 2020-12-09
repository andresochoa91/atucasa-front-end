"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var SignIn = function () {
    var setCurrentUser = react_1.useContext(Context_1.AtucasaContext).setCurrentUser;
    var _a = react_1.useState("h@v.com"), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState("123456789"), password = _b[0], setPassword = _b[1];
    var handleInput = function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        (name === "email" ? setEmail : setPassword)(value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        fetch("http://localhost:3000/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (!data.error) {
                console.log(data);
                var user_id = data.user_id, email_1 = data.email, role = data.role;
                setCurrentUser({ user_id: user_id, email: email_1, role: role });
            }
            else {
                console.log(data);
            }
        })["catch"](console.error);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Sign In"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement("label", null, "Email"),
            react_1["default"].createElement("input", { type: "email", placeholder: "email", name: "email", value: email, onChange: handleInput, required: true }),
            react_1["default"].createElement("label", null, "Password"),
            react_1["default"].createElement("input", { type: "password", placeholder: "password", name: "password", value: password, onChange: handleInput, required: true }),
            react_1["default"].createElement("input", { type: "submit" }))));
};
exports["default"] = SignIn;
