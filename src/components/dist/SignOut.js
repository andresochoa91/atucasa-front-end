"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../Context");
var SignOut = function () {
    var setCurrentUser = react_1.useContext(Context_1.AtucasaContext).setCurrentUser;
    var handleSignOut = function (event) {
        event.preventDefault();
        fetch("http://localhost:3000/logout", {
            credentials: "include",
            method: "DELETE"
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setCurrentUser(null);
        })["catch"](function (err) { return console.error(err); });
    };
    return (react_1["default"].createElement("button", { onClick: handleSignOut }, "Sign Out"));
};
exports["default"] = SignOut;
