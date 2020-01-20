"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nameController_1 = __importDefault(require("./controllers/nameController"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Welcome to the Oliver Name Counter API');
});
app.get('/name-count', nameController_1.default);
app.listen(port, () => {
    console.log("server up on port: ", port);
});
