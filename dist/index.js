"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const photoController_1 = require("./controllers/photoController");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/externalapi/photos/:id', photoController_1.getPhoto);
app.get('/externalapi/photos', photoController_1.getFilteredPh);
app.get('/test', (req, res) => {
    res.send('prueba');
});
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
