"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_leaflet_1 = require("react-leaflet");
// import CurrentLocation from './CurrentLocation';
// import Store from './Store';
require("leaflet/dist/leaflet.css");
var leaflet_1 = require("leaflet");
var marker_icon_2x_png_1 = require("leaflet/dist/images/marker-icon-2x.png");
var marker_icon_png_1 = require("leaflet/dist/images/marker-icon.png");
var marker_shadow_png_1 = require("leaflet/dist/images/marker-shadow.png");
var MyMap = function () {
    var DefaultIcon = leaflet_1["default"].icon({
        iconRetinaUrl: marker_icon_2x_png_1["default"],
        iconUrl: marker_icon_png_1["default"],
        shadowUrl: marker_shadow_png_1["default"]
    });
    // useEffect(() => {
    //   // delete L.Icon.Default.prototype._getIconUrl;
    //   // L.Icon.Default.mergeOptions({
    //   //   iconRetinaUrl: marker_icon_2x,
    //   //   iconUrl: marker_icon,
    //   //   shadowUrl: marker_shadow
    //   // });  
    //   // L.Icon.Default.imagePath = "../leaflet/dist/images/"
    //   // console.log(L.Icon.Default.imagePath)
    //   let DefaultIcon = L.icon({
    //     iconRetinaUrl: marker_icon_2x,
    //     iconUrl: marker_icon,
    //     shadowUrl: marker_shadow
    //   })
    //   L.Marker.prototype.options.icon = DefaultIcon;
    // })
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_leaflet_1.MapContainer, { center: [37.747131, -122.472583], zoom: 20, style: { height: "400px", width: "700px" } },
            react_1["default"].createElement(react_leaflet_1.TileLayer, { attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
            react_1["default"].createElement(react_leaflet_1.Circle, { center: [37.747131, -122.472583], radius: 4000 }),
            react_1["default"].createElement(react_leaflet_1.Circle, { center: [37.747131, -122.472583], radius: 14, pathOptions: {
                    fillColor: "#00a",
                    weight: 5
                } },
                react_1["default"].createElement(react_leaflet_1.Popup, null,
                    37.747131,
                    -122.472583)))));
};
exports["default"] = MyMap;
