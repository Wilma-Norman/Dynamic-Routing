'use client'
import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";

const recipiePage = ({params}: {params:  {id:string}}) => {

    const { user, saveRecipe, removeRecipe} = useUserContext() as UserContextType;
    const {id} = params
    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const [ingredients, setIngredients] = useState<string[]>([]);

    useEffect( () => {
        const fetchRecipes = async () => {
          try {
            if (id) {
              const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
              const data = await response.json();
              getIngredients(data.meals[0])
              setRecipe(data.meals[0])
            }
          }catch (error){
            console.log(error)
          }
        }
        fetchRecipes();
      }, [])
 
      const getIngredients = (data: any) => {
        console.log("getIng data: " + data)
        let ingredients: string[] = [];
        for (let index = 1; index < 20; index++) {
          let ingredientKey = `strIngredient${index}`;
          let measurmentKey = `strMeasure${index}`;
          const ingredient = data[ingredientKey];
          const measure = data[measurmentKey];
          if(data[ingredientKey] !== ""){
            ingredients.push( ingredient + ", " + measure );
          }
        }
        setIngredients(ingredients)
      }
      

  const handleSavedrecipie = () => {
    console.log(user)
    if (user) {
      console.log(recipe)
      if (recipe && !user.savedRecipies.includes(recipe.idMeal)) {
        saveRecipe(recipe.idMeal)
      } else {
        console.log(recipe?.idMeal + " finns redan på listan: " + user.savedRecipies)
      }
    }
  }

  const handleRemoveRecipe = () => {
    if(user) {
      if(recipe && user.savedRecipies.includes(recipe.idMeal)) {
        removeRecipe(recipe.idMeal)
      }else {
        console.log(recipe?.idMeal + " finns redan på listan: " + user.savedRecipies)
      }
    }
  }

    return (
        <div className='flex justify-center items-center flex-col w-full bg-[#E4CAB0] rounded-md'>
            {recipe && (                      
              <div>
                  <div className='text-center text-2xl m-5'>{recipe?.strMeal}</div>
                  <div className="flex justify-center items-start m-6">
                  <img className="rounded-md" height="auto" width="50%" src={recipe?.strMealThumb} alt="" />  
              </div>
                <div>
                  {user?.savedRecipies.includes(recipe.idMeal) ? 
                      <button onClick={handleRemoveRecipe}
                          className="bg-[#6E0D25] text-white rounded-md p-2 md:w-1/4 w-3/4">
                          UnFavorite
                        </button>
                        : (
                        <button onClick={handleSavedrecipie}
                          className="bg-[#6E0D25] text-white rounded-md p-2 md:w-1/4 w-3/4">
                          Favorite
                        </button>
                    )}
                      </div>
                        <div className="flex md:flex-row flex-col w-full justify-center md:items-start items-center">            
                        <div className="flex flex-col w-2/4 p-4 justify-center items-center">
                        <p className="font-bold">Ingredients: </p>
                          {ingredients && ingredients.map((item) => (
                          <p className="m-1"> {item}</p>
                          ))}     
                        </div>                                          
                          <div className="md:w-2/4 w-11/12 p-4 md:mr-9 flex justify-center items-center flex-col">
                          <p className="font-bold">Instructions: </p> 
                          {recipe?.strInstructions}   
                          </div>    
                            
                      </div>
                </div>
            )}     
        </div>
    )
        
}

export default recipiePage 