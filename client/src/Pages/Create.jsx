import React, { useState } from "react";
import axios from "axios"
import { useGetId } from "../Hook/useGetId";
import { useNavigate } from "react-router-dom";
import { useGetUsername } from "../Hook/useGetUsername";
import { useCookies } from "react-cookie";

const Create = () => {
  const UserId = useGetId()
  const username = useGetUsername()
  const navigate = useNavigate()
  const [cookies, _] = useCookies(["access_token"])
const [recipe, setRecipe] = useState({
  name: "",
  ingredients: [],
  instruction: "",
  imageUrl: "",
  cookingTime: 0,
  userOwner: UserId,
  userName: username
})


const handleChange = (e) => {
  const {name,value} = e.target
  setRecipe({...recipe, [name]: value})
}

const  addIngredient = (e) => {
  e.preventDefault()
  setRecipe({...recipe, ingredients: [...recipe.ingredients,"" ]})
}

const handleIngredientChange = (e, idx) => {
  const {value} = e.target
  const ingredients = recipe.ingredients;
  ingredients[idx] = value
  setRecipe({...recipe, ingredients})
}
const onSubmit = async (e) => {
e.preventDefault()
try {
 await axios.post("http://localhost:3001/recipes", recipe, {
  headers: {
    authorization: cookies.access_token
  }
 });
 alert("Recipe Created")
 navigate("/")
} catch (error) {
  console.error(error);
}
}
   return (
    <div className="create-recipe">
      <h2>Create recipe</h2>
      {
        cookies.access_token?.length < 1 ? <h3>Please Login To Create a Recipe</h3> :       <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        {/* <label htmlFor="description">Description</label>
        <textarea name="description" id="description" onChange={handleChange}></textarea> */}
        <label htmlFor="ingredients">Ingredient</label>
        {
          recipe.ingredients.map((ingredient, idx) => (
            <input type="text" value={ingredient} key={idx} name="ingredients" onChange={e => handleIngredientChange(e,idx)} />
          ))
        }
        <button onClick={addIngredient} type="button">Add Ingredient</button>
        <label htmlFor="instruction">Instruction</label>
        <textarea name="instruction" id="instruction" onChange={handleChange}></textarea>
        <label htmlFor="imageUrl">Image Url</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
        <button type="submit">Create Recipe</button>
      </form>
      }

    </div>
  );
};

export default Create;
