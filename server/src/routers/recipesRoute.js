import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./usersRoute.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipesModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", verifyToken,  async (req, res) => {
  const recipes = new RecipesModel(req.body);
  try {
    const response = await recipes.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});


router.get("/savedRecipes/:userID", async (req,res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipesModel.find({
            _id: {$in: user.savedRecipes}
        })
        res.json({savedRecipes})
    } catch (error) {
        res.json(error)
    }
})

export { router as recipesRouter };
