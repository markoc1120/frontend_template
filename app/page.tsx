import { getCurrentUser } from "@/lib/session"

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <main className="flex flex-col justify-center items-center align-middle h-screen">
      {user ? (
        <>
          <p>Hi, {user?.username}</p>
        </>
      ) : (
        <p>Unauthenticated</p>
      )}
    </main>
  )
}
