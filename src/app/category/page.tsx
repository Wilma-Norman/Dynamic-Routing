'use client'
import { useUserContext } from "@/utils/contexts";
import { CategoryType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import Link from "next/link";

const category = () => {

const { user, selectFavoriteCategory } = useUserContext() as UserContextType;
const [categories, setCategories] = useState<CategoryType[]>([]);
  
useEffect( () => {
  const fetchRecipes = async () => {
    try {
      if (user) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        const data = await response.json();
        console.log(data)
        setCategories(data.categories)
        console.log("datan i categories" + categories)
        console.log(data.categories)          
        }
      }catch (error){
        console.log(error)
      }
    }
    fetchRecipes();
  }, [])


  return (
    <>
      <h2 className="text-xl m-5">Categories</h2>
        <div className="md:grid md:grid-cols-2 md:gap-4 flex flex-col">
          {categories.length > 0 ? (
            categories.map((category: CategoryType) => (
              <div className="flex flex-col justify-between items-center p-4 border rounded-md"
                key={category.idCategory}>
                <Link href={`/category/${category.strCategory}`} className="text-center">
                  <h3 className="mb-2">{category.strCategory}</h3>
                  <img className="m-4 rounded-md" src={category.strCategoryThumb} alt={category.strCategory} />
                </Link>
                <div className="mt-2 w-full flex justify-center">
                  {user?.category === category.strCategory ? (
                    <div></div>
                  ) : (
                    <button onClick={() => selectFavoriteCategory(category.strCategory)}
                      className="bg-[#6E0D25] text-white rounded-md p-2 w-3/5">
                      Favorite
                    </button>
                  )}
                </div>
              </div>
             ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>          
      </>
      );
    };

export default category