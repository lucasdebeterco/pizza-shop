import { http, HttpResponse } from 'msw'

import { RegisterRestaurantBody } from '@/api/register-restaurant.ts'

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>(
    '/authenticate',
    async ({ request }) => {
        const { restaurantName } = await request.json()

        if (restaurantName === 'Pizza Shop') {
            return new HttpResponse(null, {status: 201})
        }

        return new HttpResponse(null, { status: 400 })
    }
)