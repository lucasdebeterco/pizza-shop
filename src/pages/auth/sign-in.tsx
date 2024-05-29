import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in.ts'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'

const signInForm = z.object({
    email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
    const [searchParams] = useSearchParams()

    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm<SignInForm>({
        defaultValues: {
            email: searchParams.get('email') ?? ''
        }
    })

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,
    })

    async function handleSignIn(data: SignInForm) {
        try {
            await authenticate({ email: data.email })

            toast.success('We send an authentication link to your email.', {
                action: {
                    label: 'Resend',
                    onClick: () => handleSignIn(data)
                }
            })
        } catch {
            toast.error('Invalid credentials.')
        }
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <Button variant="outline" asChild className="absolute right-8 top-8">
                    <Link to="/sign-up">
                        New restaurant
                    </Link>
                </Button>
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Access dashboard
                        </h1>
                        <p className="text-sm text-muted-foreground">
                        Track your sales through the partner dashboard!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Your e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <Button disabled={isSubmitting} className="w-full" type="submit">Access dashboard</Button>
                    </form>
                </div>
            </div>
        </>
    )
}