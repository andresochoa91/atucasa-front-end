"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CreateProduct = function (_a) {
    var handleProducts = _a.handleProducts;
    var _b = react_1.useState(""), productName = _b[0], setProductName = _b[1];
    var _c = react_1.useState(""), description = _c[0], setDescription = _c[1];
    var _d = react_1.useState(""), price = _d[0], setPrice = _d[1];
    var _e = react_1.useState("yes"), available = _e[0], setAvailable = _e[1];
    var _f = react_1.useState(""), productPicture = _f[0], setProductPicture = _f[1];
    var handleInput = function (event) {
        event.preventDefault();
        var _a = event.target, name = _a.name, value = _a.value;
        (name === "productName" ?
            setProductName :
            name === "description" ?
                setDescription :
                name === "price" ?
                    setPrice :
                    name === "available" ?
                        setAvailable :
                        // name === "productPicture" ? 
                        setProductPicture
        // setTax 
        )(value);
    };
    var handleAvailable = function (event) {
        event.preventDefault();
        setAvailable(event.currentTarget.value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        fetch("http://localhost:3000/current_user/products", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product_name: productName,
                description: description,
                price: Number(price),
                available: available === "yes" ? true : false,
                product_picture: productPicture,
                tax: Number(price) * 0.09
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (!data.error) {
                console.log(data);
                setProductName("");
                setDescription("");
                setPrice("");
                setProductPicture("");
                handleProducts();
            }
            else {
                console.log(data);
            }
        })["catch"](console.error);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h2", null, "Create Link"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement("label", null, "Product Name"),
            react_1["default"].createElement("input", { type: "text", name: "productName", value: productName, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Description"),
            react_1["default"].createElement("input", { type: "text", name: "description", value: description, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Price"),
            react_1["default"].createElement("input", { type: "text", name: "price", value: price, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Available"),
            react_1["default"].createElement("select", { name: "available", id: "available" },
                react_1["default"].createElement("option", { value: "yes", onClick: handleAvailable }, "Yes"),
                react_1["default"].createElement("option", { value: "no", onClick: handleAvailable }, "No")),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("label", null, "Product Picture"),
            react_1["default"].createElement("input", { type: "text", name: "productPicture", value: productPicture, onChange: handleInput }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("input", { type: "submit", value: "Submit" }))));
};
exports["default"] = CreateProduct;
