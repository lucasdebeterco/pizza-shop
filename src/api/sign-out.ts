import { api } from '@/lib/axios.ts'

export async function SignOut() {
    await api.post('/sign-out')
}