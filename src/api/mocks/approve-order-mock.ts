import { http, HttpResponse } from 'msw'

import { ApproveOrderProps } from '@/api/approve-order'

export const approveOrderMock = http.patch<ApproveOrderProps, never, never>(
    '/orders/:orderId/approve',
    async ({ params }) => {
        if(params.orderId === 'error-order-id') {
            return new HttpResponse(null, { status: 400 })
        }

        return new HttpResponse(null, { status: 204 })
    }
)