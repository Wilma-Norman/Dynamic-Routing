import Link from "next/link"

const Menue = () => {
    return(
        <nav className="bg-[#E4CAB0] md:flex md:justify-around md:items-center md:text-lg md:py-4 w-full flex flex-col md:flex-row p-3 text-lg">
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/category">Category</Link>
        </nav>
    )
}

export default Menue