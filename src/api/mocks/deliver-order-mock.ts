import { http, HttpResponse } from 'msw'

import { DeliverOrderProps } from '@/api/deliver-order'

export const deliverOrderMock = http.patch<DeliverOrderProps, never, never>(
    '/orders/:orderId/deliver',
    async ({ params }) => {
        if(params.orderId === 'error-order-id') {
            return new HttpResponse(null, { status: 400 })
        }

        return new HttpResponse(null, { status: 204 })
    }
)