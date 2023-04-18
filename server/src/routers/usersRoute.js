import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exist" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashPassword });
  await newUser.save();

  res.json({ message: "User Registered Successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect!!!" });
  }

  const token = jwt.sign({id: user._id},"secret")
  
    return res.json({token, UserId: user._id, })
  
});

export { router as userRouter };

export const verifyToken = (req,res, next) => {
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token, "secret", (err) => {
      if(err)
        return res.sendStatus(403)
      
      next()
    })
  }else{
    res.sendStatus(401)
  }
}
