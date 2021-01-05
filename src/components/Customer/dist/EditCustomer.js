"use strict";
exports.__esModule = true;
var react_1 = require("react");
var UpdateImage_1 = require("../UpdateImage");
;
var EditCustomer = function (_a) {
    var handleCurrentCustomer = _a.handleCurrentCustomer, currentCustomer = _a.currentCustomer;
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
        fetch(process.env.REACT_APP_API + "/current_user/customer", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDataCustomer)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (!data.error) {
                console.log(data);
                setUsername("");
                setFirstName("");
                setLastName("");
                setPhoneNumber("");
                setProfilePicture("");
                handleCurrentCustomer();
            }
            else {
                console.log(data);
            }
        })["catch"](console.error);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Edit Customer"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement("label", null, "Username"),
            react_1["default"].createElement("input", { type: "text", name: "username", value: username, onChange: handleInput, placeholder: currentCustomer.username }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "First Name"),
            react_1["default"].createElement("input", { type: "text", name: "firstName", value: firstName, onChange: handleInput, placeholder: currentCustomer.first_name }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Last Name"),
            react_1["default"].createElement("input", { type: "text", name: "lastName", value: lastName, onChange: handleInput, placeholder: currentCustomer.last_name }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Phone Number"),
            react_1["default"].createElement("input", { type: "text", name: "phoneNumber", value: phoneNumber, onChange: handleInput, placeholder: currentCustomer.phone_number }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Profile Picture"),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(UpdateImage_1["default"], { currentPicture: currentCustomer.profile_picture, userName: currentCustomer.username, handleInput: handleInput, newPicture: profilePicture, setNewPicture: setProfilePicture }),
            react_1["default"].createElement("input", { type: "submit", value: "Update" })),
        react_1["default"].createElement("br", null)));
};
exports["default"] = EditCustomer;
