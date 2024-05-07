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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models/models");
const zod_1 = require("zod");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(4),
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = registerSchema.parse(req.body);
        const trimmeduser = username.trim();
        const user = yield models_1.User.findOne({ username: new RegExp('^' + trimmeduser + '$', 'i') });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new models_1.User({
            username,
            email,
            password: hashedPassword,
        });
        (0, generateToken_1.default)(newUser._id, req);
        yield newUser.save();
        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            token: req.cookies.jwt
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Both username and password are required" });
        }
        const user = yield models_1.User.findOne({ username });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        (0, generateToken_1.default)(user._id, req);
        console.log(req.cookies.jwt);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            token: req.cookies.jwt
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
const logout = (req, res) => {
    try {
        res
            .clearCookie("jwt")
            .status(200)
            .json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.logout = logout;
