import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders.ts'
import { Pagination } from '@/components/pagination.tsx'
import { Table, TableBody,  TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'
import { OrderTableFilters } from '@/pages/app/orders/order-table-filters.tsx'
import { OrderTableRow } from '@/pages/app/orders/order-table-row.tsx'
import { OrderTableSkeleton } from '@/pages/app/orders/order-table-skeleton.tsx'

export function Orders() {
    const [searchParams, setSeachParams] = useSearchParams()

    const orderId = searchParams.get('orderId') ?? ''
    const customerName = searchParams.get('customerName') ?? ''
    const status = searchParams.get('status') ?? 'all'

    const pageIndex = z.coerce
        .number()
        .transform(page => page - 1)
        .parse(searchParams.get('page') ?? 1)

    const { data: result, isLoading: isLoadingOrders } = useQuery({
        queryKey: ['orders', pageIndex, orderId, customerName, status],
        queryFn: () => getOrders({ pageIndex, orderId, customerName, status: status === 'all' ? null : status })
    })

    function handlePaginate(pageIndex: number) {
        setSeachParams((state) => {
            state.set('page', String(pageIndex + 1))

            return state
        })
    }

    return (
        <>
            <Helmet title="Orders" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

                <div className="space-y-2.5">
                    <OrderTableFilters />
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[140px]">ID</TableHead>
                                    <TableHead className="w-[180px]">Created At</TableHead>
                                    <TableHead className="w-[140px]">Status</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="w-[140px]">Total (order)</TableHead>
                                    <TableHead className="w-[164px]"></TableHead>
                                    <TableHead className="w-[132[x]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingOrders && <OrderTableSkeleton />}
                                {result && result.orders.map(order => {
                                    return <OrderTableRow key={order.orderId} order={order} />
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {result && (
                    <Pagination
                        pageIndex={result.meta.pageIndex}
                        totalCount={result.meta.totalCount}
                        perPage={result.meta.perPage}
                        onPageChange={handlePaginate}
                    />
                )}
            </div>
        </>
    )
}