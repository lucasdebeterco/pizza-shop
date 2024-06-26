import { api } from '@/lib/axios.ts'

export interface DeliverOrderProps {
    orderId: string;
}

export async function deliverOrder({ orderId }: DeliverOrderProps) {
    await api.patch(`/orders/${orderId}/deliver`)
}