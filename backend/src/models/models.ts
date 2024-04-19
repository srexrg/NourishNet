import mongoose from "mongoose";



// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define food donation schema
const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodName: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  donationDate: { type: Date, default: Date.now },
});

// Define food request schema
const requestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodName: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  requestDate: { type: Date, default: Date.now },
});

// Create models
export const User = mongoose.model('User', userSchema);
export const Donation = mongoose.model('Donation', donationSchema);
export const Request = mongoose.model('Request', requestSchema);

