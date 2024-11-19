import { useUserContext } from "./contexts"
import { UserContextType } from "./types"

const saveRecipe = (recipe:string) => {
    const  {user, setUser } = useUserContext() as UserContextType
    if(user) {
        setUser({
            ...user,
            savedRecipies: [...user.savedRecipies, recipe]
        })
    }
}

export default saveRecipe