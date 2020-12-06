"use strict";
exports.__esModule = true;
exports.Provider = exports.AtucasaContext = void 0;
var react_1 = require("react");
exports.AtucasaContext = react_1.createContext({});
exports.Provider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(null), currentUser = _b[0], setCurrentUser = _b[1];
    react_1.useEffect(function () {
        fetch("http://localhost:3000/current_user", {
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
                var _a = data.user, id = _a.id, email = _a.email, role = _a.role;
                setCurrentUser({ user_id: id, email: email, role: role });
            }
        });
    }, [setCurrentUser]);
    return (react_1["default"].createElement(exports.AtucasaContext.Provider, { value: {
            currentUser: currentUser,
            setCurrentUser: setCurrentUser
        } }, children));
};
