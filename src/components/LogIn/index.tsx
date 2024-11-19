'use client'
import { SetStateAction, useState } from "react"
import { registerUsers } from "@/utils/users"
import { UserContextType, UserTypes } from "@/utils/types"
import { useUserContext } from "@/utils/contexts"

const LogIn = () => {
    const[userInput, setUserInput] = useState<string | null>(null)

    const {setUser} = useUserContext() as UserContextType

    const handleChange = (e: { target: { value: SetStateAction<string | null> } }) => {
        setUserInput(e.target.value)
    }

    const handleClick = () => {
        const loggedInUser:UserTypes[] = registerUsers.filter((user:UserTypes) => user.name === userInput)
        if (loggedInUser.length) {
            setUser(loggedInUser[0])
        }
    }

    return(
        <div className="flex flex-col justify-center items-center">
            <p className="text-lg m-2.5">Please enter your user name</p>
            <label className="m-2.5" htmlFor="user-input">Enter Username</label>
            <input className="m-2.5 border-2" id="user-input" onChange={handleChange} />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default LogIn