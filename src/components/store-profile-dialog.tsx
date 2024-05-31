import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getManagedRestaurant, GetManagedRestaurantResponse } from '@/api/get-managed-restaurant.ts'
import { updateProfile } from '@/api/update-profile.ts'
import { Button } from '@/components/ui/button.tsx'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'

export function StoreProfileDialog() {
    const queryClient = useQueryClient()
    const {
        data: managedRestaurant
    } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })

    const storeProfileSchema = z.object({
        name: z.string().min(1),
        description: z.string().nullable()
    })

    type StoreProfileSchema = z.infer<typeof storeProfileSchema>

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<StoreProfileSchema>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? '',
        }
    })

    function updateManagedRestaurantCache({name, description}: StoreProfileSchema) {
        const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

        if (cached) {
            queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
                ...cached,
                name,
                description
            })
        }

        return { cached }
    }

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate({name, description}) {
            const { cached } = updateManagedRestaurantCache({
                name,
                description
            })

            return { previusProfile: cached }
        },
        onError(_, __, context) {
            if (context?.previusProfile) {
                updateManagedRestaurantCache(context?.previusProfile)
            }
        }
    })

    async function handleUpdateProfile(data: StoreProfileSchema) {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description,
            })

            toast.success('Profile updated successfully!')
        } catch {
            toast.error('Failed to update profile, please try again!')
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Store profile</DialogTitle>
                <DialogDescription>
                    Update your store information visible to your customer
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">Name</Label>
                        <Input
                            className="col-span-3"
                            id="name"
                            {...register('name')}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="description">Description</Label>
                        <Textarea
                            className="col-span-3"
                            id="description"
                            {...register('description')}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost" type="button">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" variant="success" disabled={isSubmitting}>Save</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}