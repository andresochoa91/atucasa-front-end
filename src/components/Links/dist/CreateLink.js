"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CreateLink = function (_a) {
    var handleLinks = _a.handleLinks;
    var _b = react_1.useState(""), siteName = _b[0], setSiteName = _b[1];
    var _c = react_1.useState(""), url = _c[0], setUrl = _c[1];
    var handleInput = function (event) {
        event.preventDefault();
        var _a = event.target, name = _a.name, value = _a.value;
        (name === "siteName" ? setSiteName : setUrl)(value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + "/current_user/links", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                site_name: siteName,
                url: url
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (!data.error) {
                console.log(data);
                setSiteName("");
                setUrl("");
                handleLinks();
            }
            else {
                console.log(data);
            }
        })["catch"](console.error);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Create Link"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement("label", null, "Site Name"),
            react_1["default"].createElement("input", { type: "text", name: "siteName", value: siteName, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Url"),
            react_1["default"].createElement("input", { type: "text", name: "url", value: url, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("input", { type: "submit", value: "Submit" }))));
};
exports["default"] = CreateLink;
