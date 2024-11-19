'use client'
import { useUserContext } from "@/utils/contexts"
import LogIn from "../LogIn"
import { UserContextType } from "@/utils/types"


const  LogInWraper  = ({children}:{children:React.ReactNode}) => {
    const {user} = useUserContext() as UserContextType
    return(
        <div className="flex bg-[#E4CAB0] mt-8 rounded-md text-center flex-col justify-center items-center md:w-3/5 w-11/12  min-h-72 box-content mx-auto">
            {!user ? <LogIn /> : (
            <>
                {children}
            </>
            )}
        </div>
        
    
    )
}

export default LogInWraper