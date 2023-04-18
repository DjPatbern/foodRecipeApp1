import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import {userRouter} from "./routers/usersRoute.js"
import {recipesRouter} from "./routers/recipesRoute.js"



const app = express()


app.use(express.json())
app.use(cors())
app.use("/auth", userRouter)
app.use("/recipes", recipesRouter)



mongoose.connect("mongodb+srv://patbern:Recipe-1234@recipes.mzbflod.mongodb.net/recipes?retryWrites=true&w=majority")

app.listen(3001, () => console.log("Server is listening to port 3001...."))

