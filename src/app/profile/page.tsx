'use client'
import { RecipeType } from "@/utils/types"
import { useEffect, useState } from "react"
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import Link from "next/link";

const profile = ({params}: {params: {id:string}}) => {
    /*
    const [recipie, setRecipie] = useState<RecipeType | null>(null)
    const { user, removeRecipe} = useUserContext() as UserContextType;
    const {id} = params
    const [favorteRecipes, setFavorteRecipes] = useState<RecipeType[]>([]);

    useEffect( () => {
        const fetchRecipes = async () => {
            if (user?.savedRecipies.length) {
                try {
                    const fetchedRecipes = await Promise.all(
                        user.savedRecipies.map(async(recipeId) =>{
                            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
                            const data = await response.json();
                            return data.meals[0];
                        })
                    );
                    console.log("värdet i fetchedrecipes "+ fetchedRecipes)
                    setFavorteRecipes(fetchedRecipes)
                } catch (error) {
                    console.error("Error fetching saved recipes:", error);
                }
            }
        }
        fetchRecipes();
      }, [user])

      

      useEffect(() => {
        if (user) {
          localStorage.setItem(user.name, JSON.stringify(user));
          console.log("LocalStorage updated with new user data:", user);
        }
      }, [user?.savedRecipies]); 

      const handleRemoveRecipe = (idMeal: string) => {
        if(user){
          if(recipie && user.savedRecipies.includes(recipie.idMeal)) {
            removeRecipe(recipie.idMeal);
          }else {
            console.log(recipie?.idMeal +" finns redan, här är hela listan på users recept: " + user.savedRecipies )
          }
        }
      }
*/


const [recipie, setRecipie] = useState<RecipeType | null>(null)
const { user, saveRecipe, removeRecipe} = useUserContext() as UserContextType;
const {id} = params
const [favorteRecipes, setFavorteRecipes] = useState<RecipeType[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            if(user?.savedRecipies.length) {
                try{
                    const fetchedRecipes = await Promise.all(
                        user.savedRecipies.map(async(recipeId) => {
                            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
                            const data = await response.json();
                            return data.meals[0]
                        })
                    );

                    setFavorteRecipes(fetchedRecipes)
                }catch (error) {
                    console.error("Error", error);
                }
            }
        }
        fetchRecipes();
    }, [user])


    return (
    <>    
    <div className="w-full">
          <p className="text-lg">Welcome {user?.name}</p>
          <p>This is your favorite category: {user?.category}</p>
          <p>These are your favorite recipes</p>
          <div className="md:grid md:grid-cols-3 md:gap-3 flex flex-col">
            {favorteRecipes && favorteRecipes.map((item, index) => 
            <div className="flex flex-col justify-between items-center p-4 rounded-md" key={index}>
                <Link href={`/recipie/${item.idMeal}`}>{item.strMeal}
                <img className="rounded-md" height="auto" width="200" src={item.strMealThumb}></img>
                </Link>                                
            </div>
        )}
          </div>
        
      </div>  
    </>
    )
}
export default profile