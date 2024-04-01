import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
    return (
        <div className="grid min-h-screen grid-cols-2">
            <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
                <div className="flex items-center gap-3 text-lg font-medium text-foreground">
                    <Pizza className="size-5" />
                    <span className="font-semibold">Pizza.shop</span>
                </div>
                <footer className="text-sm">
                    Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
                </footer>
            </div>
            
            <Outlet />
        </div>
    )
}