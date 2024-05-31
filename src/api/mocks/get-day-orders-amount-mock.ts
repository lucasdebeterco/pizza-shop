import { http, HttpResponse } from 'msw'

import { GetDayOrdersAmountResponse } from '@/api/get-day-orders-amount.ts'

export const getDayOrdersAmountMock = http.get<never, never, GetDayOrdersAmountResponse>('/metrics/day-orders-amount', () => {
    return HttpResponse.json({
        amount: 10,
        diffFromYesterday: -7
    })
})