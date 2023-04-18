import React, { useEffect, useState } from "react";
import { useGetUsername } from "../Hook/useGetUsername";
import axios from "axios";
import { useGetId } from "../Hook/useGetId";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetId();
  const [cookies, ] = useCookies(["access_token"])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
          { userID }
        );
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      }, {headers: {
        authorization: cookies.access_token
      }});
setSavedRecipes(response.data.savedRecipes)    
} catch (error) {
      console.error(error);
    }
  };

  const username = useGetUsername();
  const isRecipeSaved = (id) => savedRecipes?.includes(id)
  return (
    <>
      <h1>
        {username
          ? `Welcome Back ${username} 👋`
          : `Please Login To Enjoy More 😉`}
      </h1>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <h4>Posted by: {recipe.userName}</h4>
              {
                cookies.access_token?.length > 1 && <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
              }
              
            </div>
            <div className="instructions">
              <p>{recipe.instruction}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (Minutes)</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
