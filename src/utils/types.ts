
export type UserTypes = {
    name: string, 
    category: string,
    savedRecipies: string[]
}

export type UserContextType = {
    user: UserTypes | null,
    setUser: (user:UserTypes | null)=>void
    saveRecipe: (recipe: string) => void;
    removeRecipe: (recipe: string) => void;
    selectFavoriteCategory: (category: string) => void;
}

export type RecipeType = {
    map(arg0: (meal: RecipeType) => import("react").JSX.Element): import("react").ReactNode
    strMeal: string,
    idMeal: string,
    strMealThumb: string,
    strArea?: string,
    strInstructions?: string,
}
 
export type CategoryType = {
    map(arg0: (category: CategoryType) => import("react").JSX.Element): import("react").ReactNode
    idCategory: string,
    strCategory: string,
    strCategoryThumb: string,
    strCategoryDescription: string,
}


  

  