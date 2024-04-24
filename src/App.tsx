import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider.tsx'
import { queryClient } from '@/lib/react-query.ts'
import { router } from '@/pages/routes.tsx'

export function App() {
    return (
        <HelmetProvider>
            <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
                <Helmet titleTemplate="%s | pizza.shop" />
                <Toaster richColors />
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ThemeProvider>
        </HelmetProvider>
    )
}