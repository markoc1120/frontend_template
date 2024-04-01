import Link from 'next/link';

import { auth } from '@/auth';

export default async function Home() {
  const session = await auth()

  return (
    <main className="flex flex-col justify-center items-center align-middle h-screen">
      Home
      {!session?.user && (
        <Link
          href="/login"
          className="flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Log in</span>
        </Link>
      )}
    </main>
  )
}
