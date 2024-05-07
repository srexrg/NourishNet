"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const food_routes_1 = __importDefault(require("./routes/food.routes"));
const db_1 = __importDefault(require("./db/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const protectedRoute_1 = __importDefault(require("./middleware/protectedRoute"));
const donation_controller_1 = require("./controllers/donation.controller");
dotenv_1.default.config({
    path: './.env'
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.static('public/temp'));
const port = process.env.PORT || 5000;
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("Hello");
});
app.post("/api/food/donate-food", protectedRoute_1.default, donation_controller_1.addFood);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/food", food_routes_1.default);
app.listen(port, () => {
    console.log("Listening on", port);
});
