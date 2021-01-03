"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var EditUser = function () {
    var _a = react_1.useContext(Context_1.AtucasaContext), currentUser = _a.currentUser, handleCurrentUser = _a.handleCurrentUser;
    var _b = react_1.useState(""), newEmail = _b[0], setNewEmail = _b[1];
    var _c = react_1.useState(""), newPassword = _c[0], setNewPassword = _c[1];
    var _d = react_1.useState(""), currentPassword = _d[0], setCurrentPassword = _d[1];
    var handleInput = function (event) {
        event.preventDefault();
        var _a = event.target, value = _a.value, name = _a.name;
        (name === "newEmail" ?
            setNewEmail :
            name === "currentPassword" ?
                setCurrentPassword :
                setNewPassword)(value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        ;
        var newDataUser = {
            current_password: currentPassword
        };
        if (newEmail)
            newDataUser.email = newEmail;
        if (newPassword)
            newDataUser.password = newPassword;
        fetch(process.env.REACT_APP_API + "/current_user/update", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDataUser)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            if (!data.error) {
                setNewEmail("");
                setNewPassword("");
                setCurrentPassword("");
                handleCurrentUser();
            }
        })["catch"](console.error);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null, currentUser && (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Edit User"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement("label", null, "New Email"),
            react_1["default"].createElement("input", { type: "email", name: "newEmail", value: newEmail, onChange: handleInput, placeholder: currentUser.email }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "New Password"),
            react_1["default"].createElement("input", { type: "password", name: "newPassword", value: newPassword, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Current Password"),
            react_1["default"].createElement("input", { type: "password", name: "currentPassword", value: currentPassword, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("input", { type: "submit", value: "Update", onChange: handleInput })),
        react_1["default"].createElement("br", null)))));
};
exports["default"] = EditUser;
