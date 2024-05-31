import { http, HttpResponse } from 'msw'

import { GetMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount.ts'

export const getMonthCanceledOrdersAmountMock = http.get<never, never, GetMonthCanceledOrdersAmount>(
    '/metrics/month-canceled-orders-amount',
    () => {
        return HttpResponse.json({
            amount: 200,
            diffFromLastMonth: 10
        })
    }
)