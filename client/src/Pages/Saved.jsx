import React, { useEffect, useState } from "react";
import { useGetUsername } from "../Hook/useGetUsername";
import axios from "axios";
import { useGetId } from "../Hook/useGetId";

const Saved = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetId();

  useEffect(() => {
 

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`,
          { userID }
        );
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSavedRecipes();
  }, []);


  // const username = useGetUsername();
  return (
    <>
      {/* <h1>
        {username
          ? `Welcome Back ${username} 👋`
          : `Please Login To Enjoy More 😉`}
      </h1> */}
      <h2>Saved Recipes</h2>
      <ul>
        {savedRecipes?.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <h4>Posted by: {recipe.userName}</h4>
              {/* <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button> */}
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

export default Saved;

