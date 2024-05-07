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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncomingRequest = exports.getUserRequests = exports.deleteRequest = exports.declineRequest = exports.acceptRequest = exports.requestFood = void 0;
const models_1 = require("../models/models");
const requestFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donationId = req.params.id;
        const donation = yield models_1.Donation.findById(donationId);
        if (!donation) {
            return res
                .status(404)
                .json({ success: false, message: "Donation not found" });
        }
        const { foodName, description, quantity, location, donorId, sharedBy, foodImage } = donation;
        console.log(foodName, description, quantity, donorId);
        const requesterId = req.user._id;
        if (!requesterId || !foodName || !quantity || !location || !donorId) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }
        const requester = yield models_1.User.findById(requesterId);
        if (!requester) {
            return res.status(404).json({ success: false, message: "Requester not found" });
        }
        const newRequest = new models_1.Request({
            requesterId,
            foodName,
            requesterName: requester.username,
            description,
            foodImage,
            sharedBy,
            quantity,
            location,
            donorId,
        });
        const savedRequest = yield newRequest.save();
        const updateResult = yield models_1.Donation.findByIdAndUpdate(donationId, {
            $push: { requests: savedRequest.requesterId },
        });
        if (!updateResult) {
            return res.status(500).json({
                success: false,
                message: "Failed to update donation with request",
            });
        }
        res.status(201).json({
            success: true,
            message: "Food requested successfully",
            request: savedRequest,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal server error", error: error });
    }
});
exports.requestFood = requestFood;
const acceptRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.params.id;
        if (!requestId) {
            return res.status(404).json({
                success: false,
                message: "Request Not found",
            });
        }
        const acceptRequest = yield models_1.Request.findByIdAndUpdate(requestId, { status: "approved" }, { new: true });
        res.status(200).json({
            success: true,
            message: "Request approved",
            request: acceptRequest,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal server error", error });
    }
});
exports.acceptRequest = acceptRequest;
const declineRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.params.id;
        if (!requestId) {
            return res.status(404).json({
                success: false,
                message: "Request Not found",
            });
        }
        const declineReq = yield models_1.Request.findByIdAndUpdate(requestId, { status: "declined" }, { new: true });
        console.log(declineReq);
        res.status(200).json({
            success: true,
            message: "Request Declined",
            request: declineReq,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal server error", error });
    }
});
exports.declineRequest = declineRequest;
const deleteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqId = req.params.id;
        console.log(reqId);
        if (!reqId) {
            return res.status(404).json({
                success: false,
                msg: "No request found",
            });
        }
        const deleteReq = yield models_1.Request.findByIdAndDelete(reqId);
        if (!deleteReq) {
            return res.status(400).json({
                success: false,
                msg: "Unable to delte request",
            });
        }
        res.status(200).json({
            success: true,
            message: "Request Deleted",
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal server error", error });
    }
});
exports.deleteRequest = deleteRequest;
const getUserRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requesterId = req.params.id;
        const userRequests = yield models_1.Request.find({ requesterId: requesterId });
        res.status(200).json({ success: true, requests: userRequests });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal server error", error });
    }
});
exports.getUserRequests = getUserRequests;
const getIncomingRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donorId = req.params.id;
        const userRequests = yield models_1.Request.find({ donorId: donorId, status: "pending" }).populate('requesterId', 'username');
        res.status(200).json({ success: true, requests: userRequests });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal server error", error });
    }
});
exports.getIncomingRequest = getIncomingRequest;
