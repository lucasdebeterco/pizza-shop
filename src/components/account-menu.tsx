import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getManagedRestaurant } from '@/api/get-managed-restaurant.ts'
import { getProfile } from '@/api/get-profile.ts'
import { SignOut } from '@/api/sign-out.ts'
import { StoreProfileDialog } from '@/components/store-profile-dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

export function AccountMenu() {
    const navigate = useNavigate()

    const {
        data: profile,
        isLoading: isLoadingProfile
    } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity
    })

    const {
        data: managedRestaurant,
        isLoading: isLoadingManagedRestaurant
    } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })

    const {
        mutateAsync: signOutFn,
        isPending: isSigningOut
    } = useMutation({
        mutationFn: SignOut,
        onSuccess: () => {
            navigate('/sign-in', { replace: true })
        }
    })

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex select-none items-center gap-2">
                        {isLoadingManagedRestaurant ? <Skeleton className="h-4 w-40" /> : managedRestaurant?.name}
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        {isLoadingProfile ? (
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        ) : (
                            <>
                                <span>{profile?.name}</span>
                                <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                            </>
                        )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Building className="mr-2 size-4" />
                            <span>Perfil da loja</span>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem
                        asChild
                        className="text-rose-500 dark:text-rose-400"
                        disabled={isSigningOut}
                    >
                        <button onClick={() => signOutFn()} className="w-full" >
                            <LogOut className="mr-2 size-4" />
                            <span>Sair</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <StoreProfileDialog />
        </Dialog>
    )
}