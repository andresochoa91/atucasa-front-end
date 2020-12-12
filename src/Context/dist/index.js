"use strict";
exports.__esModule = true;
exports.Provider = exports.AtucasaContext = void 0;
var react_1 = require("react");
exports.AtucasaContext = react_1.createContext({});
exports.Provider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(null), currentUser = _b[0], setCurrentUser = _b[1];
    var _c = react_1.useState(null), location = _c[0], setLocation = _c[1];
    var handleLocation = function () {
        fetch(process.env.REACT_APP_API + "/current_user/location", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            if (!data.error) {
                var _a = data.location, country = _a.country, city = _a.city, state = _a.state, address = _a.address, zip_code = _a.zip_code, details = _a.details;
                setLocation({ country: country, city: city, state: state, address: address, zip_code: zip_code, details: details });
            }
        })["catch"](console.error);
    };
    var handleCurrentUser = function () {
        fetch(process.env.REACT_APP_API + "/current_user", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            if (!data.error) {
                var _a = data.user, id = _a.id, email = _a.email, role = _a.role;
                setCurrentUser({ user_id: id, email: email, role: role });
                handleLocation();
            }
        })["catch"](console.error);
    };
    react_1.useEffect(handleCurrentUser, []);
    return (react_1["default"].createElement(exports.AtucasaContext.Provider, { value: {
            currentUser: currentUser,
            setCurrentUser: setCurrentUser,
            handleCurrentUser: handleCurrentUser,
            location: location,
            setLocation: setLocation,
            handleLocation: handleLocation
        } }, children));
};
