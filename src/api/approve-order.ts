import { api } from '@/lib/axios.ts'

export interface ApproveOrderProps {
    orderId: string;
}

export async function approveOrder({ orderId }: ApproveOrderProps) {
    await api.patch(`/orders/${orderId}/approve`)
}