import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'

const orderFilterSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional()
})

type OrderFiltersSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId') ?? ''
    const customerName = searchParams.get('customerName') ?? ''
    const status = searchParams.get('status') ?? 'all'

    const {
        register,
        handleSubmit,
        control,
        reset
    } = useForm<OrderFiltersSchema>({
        resolver: zodResolver(orderFilterSchema),
        defaultValues: {
            orderId,
            customerName,
            status
        }
    })

    function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
        setSearchParams(state => {
            if (orderId) {
                state.set('orderId', orderId)
            } else {
                state.delete('orderId')
            }

            if (customerName) {
                state.set('customerName', customerName)
            } else {
                state.delete('customerName')
            }

            if (status) {
                state.set('status', status)
            } else {
                state.delete('status')
            }

            state.set('page', '1')

            return state
        })
    }

    function handleClearFilters() {
        setSearchParams(state => {
            state.delete('orderId')
            state.delete('customerName')
            state.delete('status')
            state.set('page', '1')

            return state
        })

        reset({
            orderId: '',
            customerName: '',
            status: 'all'
        })
    }
    return (
        <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
            <span className="text-sm font-semibold">
                Filtros:
            </span>
            <Input
                placeholder="ID do pedido"
                className="h-8 w-auto"
                {...register('orderId')}
            />
            <Input
                placeholder="Nome do cliente"
                className="h-8 w-[320px]"
                {...register('customerName')}
            />

            <Controller
                name="status"
                control={control}
                render={({
                    field: {
                        name,
                        onChange,
                        value,
                        disabled
                    }
                }) => {
                    return (
                        <Select
                            defaultValue="all"
                            name={name}
                            onValueChange={onChange}
                            value={value}
                            disabled={disabled}
                        >
                            <SelectTrigger className="h-8 w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos os status</SelectItem>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="canceled">Cancelado</SelectItem>
                                <SelectItem value="processing">Em preparo</SelectItem>
                                <SelectItem value="delivering">Em entrega</SelectItem>
                                <SelectItem value="delivered">Entregue</SelectItem>
                            </SelectContent>
                        </Select>
                    )
                }}
            />

            <Button type="submit" variant="secondary" size="sm">
                <Search className="mr-2 size-4" />
                Filtrar resultados
            </Button>

            <Button onClick={handleClearFilters} type="button" variant="outline" size="sm">
                <X className="mr-2 size-4" />
                Remover Filtros
            </Button>
        </form>
    )
}