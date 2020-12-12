"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ShowMerchant = function (_a) {
    var _b;
    var merchant = _a.merchant;
    var _c = react_1.useState(), current_user = _c[0], setCurrentUser = _c[1];
    console.log(merchant.user_id);
    console.log(process.env.REACT_APP_API + "/users/" + ((_b = merchant.user_id) === null || _b === void 0 ? void 0 : _b.toString()));
    react_1.useEffect(function () {
        fetch(process.env.REACT_APP_API + "/users/" + merchant.user_id)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data.user);
            setCurrentUser(data.user);
        })["catch"](console.error);
    }, [merchant.user_id]);
    return (react_1["default"].createElement("div", null, current_user && current_user.email));
};
exports["default"] = ShowMerchant;
