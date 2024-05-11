import { api } from '@/lib/axios.ts'

interface CancelOrderProps {
    orderId: string;
}

export async function cancelOrder({ orderId }: CancelOrderProps) {
    await api.patch(`/orders/${orderId}/cancel`)
}