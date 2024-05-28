import { http, HttpResponse } from 'msw'

import { CancelOrderProps } from '@/api/cancel-order'

export const cancelOrderMock = http.patch<CancelOrderProps, never, never>(
    '/orders/:orderId/cancel',
    async ({ params }) => {
        if(params.orderId === 'error-order-id') {
            return new HttpResponse(null, { status: 400 })
        }

        return new HttpResponse(null, { status: 204 })
    }
)