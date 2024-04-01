import { auth } from '@/auth';

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div>
      {session?.user ? (
        <>
          <p>Hi, {session.user?.username}</p>
        </>
      ) : (
        <p>Unauthenticated</p>
      )}
    </div>
  )
}
