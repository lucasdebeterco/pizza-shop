import { DialogTitle } from '@radix-ui/react-dialog'

import { DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog.tsx'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'

export function OrderDetails() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pedido: XXXX</DialogTitle>
                <DialogDescription>Detalhes do pedido</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Status</TableCell>
                            <TableCell className="flex items-center justify-end gap-2">
                                <span className="size-2 rounded-full bg-slate-400"></span>
                                <span className="font-medium text-muted-foreground">
                                    Pendente
                                </span>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Cliente</TableCell>
                            <TableCell className="flex justify-end">
                                Lucas Debeterco
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Telefone</TableCell>
                            <TableCell className="flex justify-end">
                                (47) 989073883
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">E-mail</TableCell>
                            <TableCell className="flex justify-end">
                                lucasdebeterco@gmail.com
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Realizado há</TableCell>
                            <TableCell className="flex justify-end">
                                há 3 minutos
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-right">Qtd.</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Pizza Frango com Catupiry</TableCell>
                            <TableCell className="text-right">2</TableCell>
                            <TableCell className="text-right">R$ 69,98</TableCell>
                            <TableCell className="text-right">R$ 139,88</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Pizza Frango com Catupiry</TableCell>
                            <TableCell className="text-right">2</TableCell>
                            <TableCell className="text-right">R$ 69,98</TableCell>
                            <TableCell className="text-right">R$ 139,88</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total do pedido</TableCell>
                            <TableCell className="text-right font-medium">
                                R$ 139,88
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </DialogContent>
    )
}