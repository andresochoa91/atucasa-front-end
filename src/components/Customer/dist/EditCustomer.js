"use strict";
exports.__esModule = true;
var react_1 = require("react");
;
var EditCustomer = function (_a) {
    var handleCurrentCustomer = _a.handleCurrentCustomer;
    var _b = react_1.useState(""), username = _b[0], setUsername = _b[1];
    var _c = react_1.useState(""), firstName = _c[0], setFirstName = _c[1];
    var _d = react_1.useState(""), lastName = _d[0], setLastName = _d[1];
    var _e = react_1.useState(""), phoneNumber = _e[0], setPhoneNumber = _e[1];
    var _f = react_1.useState(""), profilePicture = _f[0], setProfilePicture = _f[1];
    var handleInput = function (event) {
        event.preventDefault();
        var _a = event.target, name = _a.name, value = _a.value;
        (name === "username" ?
            setUsername :
            name === "firstName" ?
                setFirstName :
                name === "lastName" ?
                    setLastName :
                    name === "phoneNumber" ?
                        setPhoneNumber :
                        setProfilePicture)(value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        var newDataCustomer = {};
        if (username)
            newDataCustomer.username = username;
        if (firstName)
            newDataCustomer.first_name = firstName;
        if (lastName)
            newDataCustomer.last_name = lastName;
        if (phoneNumber)
            newDataCustomer.phone_number = phoneNumber;
        if (profilePicture)
            newDataCustomer.profile_picture = profilePicture;
        console.log(newDataCustomer);
        fetch("http://localhost:3000/current_user/customer", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDataCustomer)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            if (!data.error)
                handleCurrentCustomer();
        })["catch"](console.error);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Edit Customer"),
        react_1["default"].createElement("form", { onChange: handleInput, onSubmit: handleSubmit },
            react_1["default"].createElement("label", null, "Username"),
            react_1["default"].createElement("input", { type: "text", name: "username", defaultValue: username }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "First Name"),
            react_1["default"].createElement("input", { type: "text", name: "firstName", defaultValue: firstName }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Last Name"),
            react_1["default"].createElement("input", { type: "text", name: "lastName", defaultValue: lastName }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Phone Number"),
            react_1["default"].createElement("input", { type: "text", name: "phoneNumber", defaultValue: phoneNumber }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Profile picture"),
            react_1["default"].createElement("input", { type: "text", name: "profilePicture", defaultValue: profilePicture }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("input", { type: "submit", value: "Update" })),
        react_1["default"].createElement("br", null)));
};
exports["default"] = EditCustomer;
