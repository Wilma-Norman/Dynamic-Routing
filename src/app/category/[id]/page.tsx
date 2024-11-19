'use client'
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";


const categoryID = ({params}: {params: {id:string}}) => {
    const {id} = params
    const { user } = useUserContext() as UserContextType;
  const [recipes, setRecipes] = useState<RecipeType | null >(null)

  useEffect( () => {
    const fetchRecipes = async () => {
      try {
        if (id) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
          const data = await response.json();
          console.log(id)
        setRecipes(data.meals)
          
        }
      }catch (error){
        console.log(error)
      }
      
    }
    fetchRecipes();
  }, [])

  return (
    <>
      {user && (
      <div className="flex flex-col w-full bg-[#E4CAB0] justify-center rounded-md">
      <p className="text-lg m-5 border-b-2">Your favorite category of food is {user.category}</p>
        <div className="md:grid md:grid-cols-3 flex flex-col rounded-md justify-center items-center md:gap-4 p-3">
          {recipes && recipes.map((meal: RecipeType) => (
          <div className="flex flex-col w-fit justify-center items-center m-4" key={meal.idMeal}>
            <Link className="flex flex-col justify-center items-center" href={`/recipie/${meal.idMeal}`}>{meal.strMeal}
            <img className="w-4/5 h-auto rounded-md" src={meal.strMealThumb}  />
            </Link>
          </div>
          ))}
        </div>
      </div>
    )}
    </>
  
  );

}

export default categoryID
