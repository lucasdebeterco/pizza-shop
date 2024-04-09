import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/App.tsx'
import { AuthLayout } from '@/pages/_layouts/Auth.tsx'
import { Dashboard } from '@/pages/app/dashboard.tsx'
import { Orders } from '@/pages/app/orders/orders.tsx'
import { SignIn } from '@/pages/auth/sign-in.tsx'
import { SignUp } from '@/pages/auth/sign-up.tsx'

export const router = createBrowserRouter([{
    path: '/',
    element: <AppLayout/>,
    children: [{
        path: '/',
        element: <Dashboard />
    }, {
        path: '/orders',
        element: <Orders />
    }]
}, {
    path: '/',
    element: <AuthLayout />,
    children: [{
        path: '/sign-in',
        element: <SignIn />
    },{
        path: '/sign-up',
        element: <SignUp />
    }]
}])