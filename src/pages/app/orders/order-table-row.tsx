import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { TableCell, TableRow } from '@/components/ui/table.tsx'

export function OrderTableRow() {
    return (
        <TableRow>
            <TableCell>
                <Button variant="outline" size="xs">
                    <Search className="size-3" />
                    <span className="sr-only">Detalhes do pedido</span>
                </Button>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                c6ds78v9f6d78csjklhghjgf
            </TableCell>
            <TableCell className="text-muted-foreground">
                há 15 minutos
            </TableCell>
            <TableCell className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-slate-400"></span>
                <span className="font-medium text-muted-foreground">Pendente</span>
            </TableCell>
            <TableCell className="font-medium">
                Lucas Debeterco
            </TableCell>
            <TableCell className="font-medium">
                R$ 149,90
            </TableCell>
            <TableCell>
                <Button variant="outline" size="xs">
                    <ArrowRight className="mr-2 size-3" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="ghost" size="xs">
                    <X className="mr-2 size-3" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}