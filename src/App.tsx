import './global.css'

import { RouterProvider } from 'react-router-dom'

import { router } from '@/pages/routes.tsx'

export function App() {
    return (
        <RouterProvider router={router} />
    )
}