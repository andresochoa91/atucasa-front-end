"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DeleteLink = function (_a) {
    var link = _a.link, handleLinks = _a.handleLinks;
    var handleDelete = function () {
        if (window.confirm("are you sure?")) {
            fetch(process.env.REACT_APP_API + "/current_user/links/" + link.id, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                handleLinks();
            })["catch"](console.error);
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("button", { onClick: handleDelete }, "Delete")));
};
exports["default"] = DeleteLink;
