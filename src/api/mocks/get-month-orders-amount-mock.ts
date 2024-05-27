import { http, HttpResponse } from 'msw'

import { GetMonthOrdersAmountResponse } from '@/api/get-month-orders-amount.ts'

export const getMonthOrdersAmountMock = http.get<never, never, GetMonthOrdersAmountResponse>('/metrics/month-orders-amount', () => {
    return HttpResponse.json({
        amount: 20,
        diffFromLastMonth: -5
    })
})