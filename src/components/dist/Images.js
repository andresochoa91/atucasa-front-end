"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var base_1 = require("../base");
var db = base_1.app.firestore();
var ImageForm = function () {
    var _a = react_1.useState(null), fileUrl = _a[0], setFileUrl = _a[1];
    var _b = react_1.useState([]), users = _b[0], setUsers = _b[1];
    var onFileChange = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var file, storageRef, fileRef, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = event.target.files[0];
                    storageRef = base_1.app.storage().ref();
                    fileRef = storageRef.child(file.name);
                    return [4 /*yield*/, fileRef.put(file)];
                case 1:
                    _b.sent();
                    _a = setFileUrl;
                    return [4 /*yield*/, fileRef.getDownloadURL()];
                case 2:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); };
    console.log(users);
    var onSubmit = function (event) {
        event.preventDefault();
        var username = event.target.username.value;
        if (!username) {
            return;
        }
        db.collection("users").doc(username).set({
            name: username,
            avatar: fileUrl
        });
    };
    react_1.useEffect(function () {
        var fetchUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var usersCollection, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection("users").get()];
                    case 1:
                        usersCollection = _a.sent();
                        setUsers(usersCollection.docs.map(function (doc) {
                            return doc.data();
                        }));
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchUsers();
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("form", { onSubmit: onSubmit },
            react_1["default"].createElement("input", { type: "file", onChange: onFileChange }),
            react_1["default"].createElement("input", { type: "text", name: "username", placeholder: "Name" }),
            react_1["default"].createElement("button", null, "Submit")),
        react_1["default"].createElement("ul", null, users.map(function (user) { return (react_1["default"].createElement("li", { key: user.name },
            react_1["default"].createElement("img", { width: "100", height: "100", src: user.avatar, alt: user.name }),
            react_1["default"].createElement("p", null, user.name))); }))));
};
exports["default"] = ImageForm;
