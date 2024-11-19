'use client'
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const {user} = useUserContext() as UserContextType

  const [recipies, setRecipies] = useState < RecipeType[] | null >(null)

    useEffect( () => {
      const fetchRecipies = async () => {
        try {
          if (user) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.category}`)
            const data = await response.json();

            const topFiveRecipies = data.meals.slice(0, 24);

            setRecipies(topFiveRecipies)
          } 
          } catch (error) {
              console.log(error)
          }
        }
        fetchRecipies();
    }, [])
  return (
    <>
    {user && (
      <div className="flex flex-col justify-center items-center">
        <div className='m-4 border-b-2'>
          <p className='text-lg'>Hi {user.name}</p>
          <p className='text-lg mb-4'>Your favorite category of food is {user.category}</p>
        </div>
        
        <div className='md:grid md:grid-cols-3 flex md:items-center flex-col md:justify-center gap-4'>
          {recipies && recipies.map((meal:RecipeType) => 
          <div className='p-3 flex justify-center items-center'>
          <Link className="flex justify-center items-center flex-col" href={`/recipie/${meal.idMeal}`}> {meal.strMeal}
          <img className="rounded-md flex justify-center items-center" src={meal.strMealThumb} height="auto" width="80%"></img>
          </Link>
          </div>
       )}
        </div>
      </div>
    )}
    </>
  );
}
