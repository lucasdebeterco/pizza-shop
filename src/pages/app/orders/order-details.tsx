import { DialogTitle } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getOrderDetails } from '@/api/get-order-details.ts'
import { OrderStatus } from '@/components/order-status.tsx'
import { DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog.tsx'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'
import { priceFormatter } from '@/lib/priceFormatter'
import { OrderDetailsSkeleton } from '@/pages/app/orders/order-details-skeleton.tsx'

interface OrderDetailsProps {
    orderId: string
    open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
    const { data: order } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderDetails({ orderId }),
        enabled: open
    })


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Order: {orderId}</DialogTitle>
                <DialogDescription>Order Details</DialogDescription>
            </DialogHeader>

            {order ? (
                <div className="space-y-6">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Status</TableCell>
                                <OrderStatus status={order.status} />
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Customer</TableCell>
                                <TableCell className="flex justify-end">
                                    {order.customer.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Phone</TableCell>
                                <TableCell className="flex justify-end">
                                    {order.customer.phone ?? 'Not informed'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">E-mail</TableCell>
                                <TableCell className="flex justify-end">
                                    {order.customer.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">Created At</TableCell>
                                <TableCell className="flex justify-end">
                                    {formatDistanceToNow(order.createdAt, {
                                        locale: ptBR,
                                        addSuffix: true
                                    })}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Produto</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.orderItems.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.product.name}</TableCell>
                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                    <TableCell className="text-right">
                                        {priceFormatter.format(item.priceInCents / 100)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {priceFormatter.format((item.priceInCents * item.quantity) / 100)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total (order)</TableCell>
                                <TableCell className="text-right font-medium">
                                    {priceFormatter.format(order.totalInCents / 100)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            ) : (
                <OrderDetailsSkeleton />
            )}
        </DialogContent>
    )
}