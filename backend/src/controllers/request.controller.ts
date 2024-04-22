import { Request, Response } from "express";
import { Request as RequestModel, Donation } from "../models/models";
import { FoodRequest, UserAuthInfoRequest } from "../types/types";
export const requestFood = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const donationId = req.params.id;

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res
        .status(404)
        .json({ success: false, message: "Donation not found" });
    }

    const { foodName, description, quantity, location, donorId } = donation;

    const requesterId = req.user._id;

    if (!requesterId || !foodName || !quantity || !location || !donorId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newRequest = new RequestModel({
      requesterId,
      foodName,
      description,
      quantity,
      location,
      donorId,
    });

    const savedRequest = await newRequest.save();
    const updateResult = await Donation.findByIdAndUpdate(donationId, {
      $push: { requests: savedRequest.requesterId },
    });

    if (!updateResult) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to update donation with request",
        });
    }

    res.status(201).json({
      success: true,
      message: "Food requested successfully",
      request: savedRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

export const getUserRequests = async (req: Request, res: Response) => {
  try {
    const requesterId = req.params.id;

    const userRequests = await RequestModel.find({ requesterId: requesterId });

    res.status(200).json({ success: true, requests: userRequests });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};
