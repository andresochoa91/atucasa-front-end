"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var EditLocation = function () {
    var _a = react_1.useContext(Context_1.AtucasaContext), location = _a.location, handleLocation = _a.handleLocation;
    var _b = react_1.useState(""), country = _b[0], setCountry = _b[1];
    var _c = react_1.useState(""), state = _c[0], setState = _c[1];
    var _d = react_1.useState(""), city = _d[0], setCity = _d[1];
    var _e = react_1.useState(""), address = _e[0], setAddress = _e[1];
    var _f = react_1.useState(""), zipCode = _f[0], setZipCode = _f[1];
    var _g = react_1.useState(""), details = _g[0], setDetails = _g[1];
    var handleInput = function (event) {
        event.preventDefault();
        var _a = event.target, value = _a.value, name = _a.name;
        (name === "country" ?
            setCountry :
            name === "state" ?
                setState :
                name === "city" ?
                    setCity :
                    name === "address" ?
                        setAddress :
                        name === "zipCode" ?
                            setZipCode :
                            setDetails)(value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        var newLocation = {};
        if (country)
            newLocation.country = country;
        if (state)
            newLocation.state = state;
        if (city)
            newLocation.city = city;
        if (address)
            newLocation.address = address;
        if (zipCode)
            newLocation.zip_code = zipCode;
        if (details)
            newLocation.details = details;
        fetch(process.env.REACT_APP_API + "/current_user/location", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLocation)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            if (!data.error) {
                setCountry("");
                setState("");
                setCity("");
                setAddress("");
                setZipCode("");
                setDetails("");
                handleLocation();
            }
        })["catch"](console.error);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null, location && (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Edit Location"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement("label", null, "Country"),
            react_1["default"].createElement("input", { type: "text", name: "country", value: country, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "State"),
            react_1["default"].createElement("input", { type: "text", name: "state", value: state, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "City"),
            react_1["default"].createElement("input", { type: "text", name: "city", value: city, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Address"),
            react_1["default"].createElement("input", { type: "text", name: "address", value: address, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Zip Code"),
            react_1["default"].createElement("input", { type: "text", name: "zipCode", value: zipCode, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Details"),
            react_1["default"].createElement("input", { type: "text", name: "details", value: details, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("input", { type: "submit", value: "Update", onChange: handleInput })),
        react_1["default"].createElement("br", null)))));
};
exports["default"] = EditLocation;
