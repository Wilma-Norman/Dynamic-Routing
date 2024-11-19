'use client'
import {createContext, useContext, useState} from 'react'
import { UserContextType, UserTypes } from './types'

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<UserTypes | null>(null)

    const saveRecipe = (recipe: string) => {
        if (user) {
            setUser({
                ...user,
                savedRecipies: [...user.savedRecipies, recipe],
            });
        }
    };

    const removeRecipe = (recipe: string) => {
        if (user) {
            const updatedSavedRecipes = user.savedRecipies.filter(
                (savedRecipe) => savedRecipe !== recipe
            );

            setUser({
                ...user,
                savedRecipies: updatedSavedRecipes,
            })
        }
    }

    const selectFavoriteCategory = (newCategory: string) => {
        if (user && user.category !== newCategory) {
            setUser({ ...user, category: newCategory})
        }
    }

    return (
        <UserContext.Provider value={{user, setUser, selectFavoriteCategory, removeRecipe, saveRecipe}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}

export default UserProvider