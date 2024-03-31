"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>
      {session?.user ? (
        <button
          onClick={() => signOut()}
          className="flex gap-4 ml-auto text-red-600"
        >
          Sign Out
        </button>
      ) : (
        <Link href={"/signIn"} className="flex gap-4 ml-auto text-green-600">
          Sign in
        </Link>
      )}
      <p>{session?.user?.username}</p>
    </nav>
  )
}

export default Navbar
