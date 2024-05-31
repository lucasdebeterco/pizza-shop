import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue.ts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { MetricCardSkeleton } from '@/pages/app/dashboard/metric-card-skeleton.tsx'

export function MonthRevenueCard() {
    const { data: monthRevenue } = useQuery({
        queryFn: getMonthRevenue,
        queryKey: ['metrics', 'month-revenue']
    })

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                    Total revenue (month)
                </CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                {monthRevenue ? (
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {(monthRevenue.receipt / 100).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            {monthRevenue.diffFromLastMonth >= 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400">{monthRevenue.diffFromLastMonth}%</span> compared to last month
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">{monthRevenue.diffFromLastMonth}%</span> compared to last month
                                </>
                            )}
                        </p>
                    </>
                ) : (
                    <MetricCardSkeleton />
                )}
            </CardContent>
        </Card>
    )
}