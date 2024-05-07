"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.Donation = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const donationSchema = new mongoose_1.Schema({
    donorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    foodName: { type: String, required: true },
    description: { type: String },
    quantity: { type: String, required: true },
    foodImage: { type: String, required: true },
    sharedBy: { type: String, required: true },
    location: { type: String, required: true },
    donationDate: { type: Date, default: Date.now },
    requesterId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    requests: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Request" }],
});
const requestSchema = new mongoose_1.default.Schema({
    requesterId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    foodName: { type: String, required: true },
    description: { type: String },
    quantity: { type: String, required: true },
    foodImage: { type: String, required: true },
    sharedBy: { type: String, required: true },
    location: { type: String, required: true },
    donorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    requestDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["pending", "approved", "declined", "cancelled"],
        default: "pending",
    },
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Donation = mongoose_1.default.model('Donation', donationSchema);
exports.Request = mongoose_1.default.model('Request', requestSchema);
