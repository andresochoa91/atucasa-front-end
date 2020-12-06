"use strict";
exports.__esModule = true;
exports.Provider = exports.AtucasaContext = void 0;
var react_1 = require("react");
exports.AtucasaContext = react_1.createContext({});
exports.Provider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(null), currentUser = _b[0], setCurrentUser = _b[1];
    return (react_1["default"].createElement(exports.AtucasaContext.Provider, { value: {
            currentUser: currentUser,
            setCurrentUser: setCurrentUser
        } }, children));
};
