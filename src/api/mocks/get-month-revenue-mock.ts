import { http, HttpResponse } from 'msw'

import { GetMonthRevenueResponse } from '@/api/get-month-revenue.ts'

export const getMonthRevenueMock = http.get<never, never, GetMonthRevenueResponse>(
    '/metrics/month-receipt-amount',
    () =>  HttpResponse.json({
        receipt: 2000,
        diffFromLastMonth: 10
    })
)