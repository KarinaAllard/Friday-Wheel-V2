import mongoose, { Schema, Document } from "mongoose";

export interface IEntry extends Document {
    restaurant: string;
    suggestedBy: string;
}

const EntrySchema: Schema = new Schema({
    restaurant: { type: String, required: true },
    suggestedBy: { type: String, required: true },
});

export default mongoose.model<IEntry>("Entry", EntrySchema);