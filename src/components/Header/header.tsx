'use client'
import { useUserContext } from "@/utils/contexts";
import { UserContextType, UserTypes } from "@/utils/types"

const Header = () => {
    const { user, setUser} = useUserContext() as UserContextType;

    return(
        <header className="bg-[#774E24] w-full">
            {user ? <button className="md:absolute flex flex-col text-white md:m-2 p-2 rounded bg-[#6E0D25]" onClick={()=> setUser(null)}>Log Out</button> : "" } 
            <h1 className="text-white md:text-5xl text-3xl py-8 text-center">Recipe Finder</h1>
        </header>
    )
}

export default Header