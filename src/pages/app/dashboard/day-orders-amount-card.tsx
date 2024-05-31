import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount.ts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { MetricCardSkeleton } from '@/pages/app/dashboard/metric-card-skeleton.tsx'

export function DayOrdersAmountCard() {
    const { data: dayOrdersAmount } = useQuery({
        queryFn: getDayOrdersAmount,
        queryKey: ['metrics', 'day-orders-amount']
    })

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                    Orders (day)
                </CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                {dayOrdersAmount ? (
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {dayOrdersAmount.amount.toLocaleString('en-US')}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            {dayOrdersAmount.diffFromYesterday >= 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400">{dayOrdersAmount.diffFromYesterday}%</span> compared to yesterday
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">{dayOrdersAmount.diffFromYesterday}%</span> compared to yesterday
                                </>
                            )}
                        </p>
                    </>
                ) : (
                    <MetricCardSkeleton />
                )}
            </CardContent>
        </Card>)
}