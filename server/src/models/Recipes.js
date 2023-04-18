import mongoose from "mongoose";

const RecipesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instruction: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

export const RecipesModel = mongoose.model("recipes", RecipesSchema);
