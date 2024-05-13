import { api } from '@/lib/axios.ts'

interface DispatchOrderProps {
    orderId: string;
}

export async function dispatchOrder({ orderId }: DispatchOrderProps) {
    await api.patch(`/orders/${orderId}/dispatch`)
}