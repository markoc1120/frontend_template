"use client"

import * as React from "react"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormData = {
  username: string
  password: string
}

type Props = {
  className?: string
  callbackUrl?: string
  error?: string
}

const UserAuthForm = (props: Props) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    })

    setIsLoading(false)

    if (!signInResult?.error) {
      router.push(props.callbackUrl ?? "http://localhost:3000")
    }
  }
  return (
    <div className="grid gap-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="username">
            Username
          </Label>
          <Input
            id="username"
            placeholder="username"
            type="username"
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect="off"
            disabled={isLoading}
            {...register("username")}
          />
          {errors?.username && (
            <p className="px-1 text-xs text-red-600">
              {errors.username.message}
            </p>
          )}
          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
            disabled={isLoading}
            {...register("password")}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <button disabled={isLoading}>Sign in</button>
      </form>
    </div>
  )
}

export default UserAuthForm
