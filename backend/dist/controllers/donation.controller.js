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
exports.deleteFood = exports.updateFood = exports.getFoodByCurrentUser = exports.getFoodById = exports.getAllFood = exports.addFood = void 0;
const models_1 = require("../models/models");
const addFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodName, description, quantity, location, donationDate, foodImage } = req.body;
        console.log(req.body);
        const { _id: donorId, username } = req.user;
        const newDonation = new models_1.Donation({
            donorId,
            foodName,
            foodImage,
            description,
            quantity,
            location,
            donationDate,
            sharedBy: username
        });
        yield newDonation.save();
        return res.status(201).json({
            newDonation,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to create donation" });
    }
});
exports.addFood = addFood;
const getAllFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donations = yield models_1.Donation.find();
        if (!donations) {
            return res.status(404).json({
                message: "No Donations found",
            });
        }
        res.status(200).json(donations);
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            message: "Error getting donations",
        });
    }
});
exports.getAllFood = getAllFood;
const getFoodById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const donation = yield models_1.Donation.findById(id);
        if (!donation) {
            return res.status(404).json({ error: "Donation not found" });
        }
        res.status(200).json(donation);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get donation" });
    }
});
exports.getFoodById = getFoodById;
const getFoodByCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUsername = req.user.username;
        const donations = yield models_1.Donation.find({ sharedBy: currentUsername });
        if (!donations) {
            return res.status(404).json({ error: "No donations found for the current user" });
        }
        // if (donations.length === 0) {
        //   return res.status(404).json({ error: "No donations found for the current user" });
        // }
        res.status(200).json(donations);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get donations for the current user" });
    }
});
exports.getFoodByCurrentUser = getFoodByCurrentUser;
const updateFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodName, description, quantity, location, donationDate } = req.body;
        const donorId = req.user._id;
        if (!donorId || !foodName || !quantity || !location) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const donation = yield models_1.Donation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!donation) {
            return res.status(404).json({ error: "Donation not found" });
        }
        res.status(200).json(donation);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to create donation" });
    }
});
exports.updateFood = updateFood;
const deleteFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donationId = req.params.id;
        const donation = yield models_1.Donation.findByIdAndDelete(donationId);
        if (!donation) {
            return res.status(404).json({ error: "Donation not found" });
        }
        res.status(200).json({ message: "Donation deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Failed to delete donation", message: error });
    }
});
exports.deleteFood = deleteFood;
