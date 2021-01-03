"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Context_1 = require("../../Context");
var react_leaflet_1 = require("react-leaflet");
require("leaflet/dist/leaflet.css");
var Place_1 = require("./Place");
var MyMap = function (_a) {
    var lat = _a.lat, lng = _a.lng;
    var location = react_1.useContext(Context_1.AtucasaContext).location;
    var _b = react_1.useState([]), merchants = _b[0], setMerchants = _b[1];
    react_1.useEffect(function () {
        fetch(process.env.REACT_APP_API + "/merchants", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setMerchants(data.merchants);
        });
    }, []);
    console.log(merchants);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_leaflet_1.MapContainer, { center: [lat, lng], zoom: 20, minZoom: 10, style: { height: "400px", width: "700px" } },
            react_1["default"].createElement(react_leaflet_1.TileLayer, { attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
            react_1["default"].createElement(react_leaflet_1.Circle, { center: [lat, lng], radius: 8000, pathOptions: {
                    fillColor: "#00a",
                    stroke: false
                } }),
            react_1["default"].createElement(react_leaflet_1.Circle, { center: [lat, lng], radius: 14, pathOptions: {
                    fillColor: "#00a",
                    weight: 6
                } },
                react_1["default"].createElement(react_leaflet_1.Popup, null,
                    react_1["default"].createElement("p", null, "Your location: " + (location === null || location === void 0 ? void 0 : location.address)))),
            merchants.map(function (merchant) { return (react_1["default"].createElement(Place_1["default"], { merchant: merchant, key: merchant.email })); }))));
};
exports["default"] = MyMap;
