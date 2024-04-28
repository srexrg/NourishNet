import { Donation } from "../models/models";
import { Request, Response } from "express";
import { FoodRequest, UserAuthInfoRequest } from "../types/types";
import { uploadOnCloudinary } from "../utils/cloudinary";

export const addFood = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const { foodName, description, quantity, location, donationDate } =
      req.body;

      const { _id: donorId, username } = req.user;

    const imagePath = req.file?.path;

    if (!imagePath) {
      throw new Error("Image required");
    }

    const foodPic = await uploadOnCloudinary(imagePath)

    if (!foodPic) {
      throw new Error("Failed to upload image");
    }

    const newDonation = new Donation({
      donorId,
      foodName,
      foodImage:foodPic.url,
      description,
      quantity,
      location,
      donationDate,
      sharedBy:username
    });

    await newDonation.save();
    return res.status(201).json({
      newDonation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create donation" });
  }
};

export const getAllFood = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.find();

    if (!Donation) {
      return res.status(401).json({
        message: "No Donations found",
      });
    }
    res.status(200).json(donations);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Error getting donations",
    });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {

    const {id} = req.params;
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.status(200).json(donation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get donation" });
  }
};

export const getFoodByCurrentUser = async (req:UserAuthInfoRequest, res:Response) => {
  try {
    const currentUsername = req.user.username; // Assuming username is stored in req.user after authentication

    // Query donations associated with the current user's username
    const donations = await Donation.find({ sharedBy: currentUsername });

    if (donations.length === 0) {
      return res.status(404).json({ error: "No donations found for the current user" });
    }

    res.status(200).json(donations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get donations for the current user" });
  }
};


export const updateFood = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const { foodName, description, quantity, location, donationDate } =
      req.body as unknown as FoodRequest;

    const donorId = req.user._id;

    if (!donorId || !foodName || !quantity || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.status(200).json(donation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create donation" });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to delete donation", message: error });
  }
};
