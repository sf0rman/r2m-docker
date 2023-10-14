"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server = (0, express_1.default)();
server.listen(8080, function () {
    console.log("Server listening on port ".concat(8080));
});
