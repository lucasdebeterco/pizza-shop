import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from '@/pages/app/dashboard.tsx'
import { SignIn } from '@/pages/auth/sign-in.tsx'

export const router = createBrowserRouter([{
    path: '/',
    element: <Dashboard />
}, {
    path: 'sign-in',
    element: <SignIn />
}])