
import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  donorId: Schema.Types.ObjectId;
  foodName: string;
  description: string;
  quantity: number;
  foodImage:string;
  location: string;
  sharedBy: string;
  donationDate: Date;
  requesterId?: Schema.Types.ObjectId;
  requests?: Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const donationSchema = new Schema<IDonation>({
  donorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  foodName: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  foodImage:{type:String,required:true},
  sharedBy: { type: String, required: true },
  location: { type: String, required: true },
  donationDate: { type: Date, default: Date.now },
  requesterId: { type: Schema.Types.ObjectId, ref: "User" },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
});


const requestSchema = new mongoose.Schema({
  requesterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  foodName: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  donorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  requestDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "approved", "declined", "cancelled"],
    default: "pending",
  },
});


export const User = mongoose.model('User', userSchema);
export const Donation = mongoose.model('Donation', donationSchema);
export const Request = mongoose.model('Request', requestSchema);

