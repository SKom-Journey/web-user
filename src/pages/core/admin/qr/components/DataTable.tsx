import { Checkbox } from "@/components/ui/checkbox"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[]
   data: TData[]
   selectedRows: string[]
   onRowSelect: (id: string) => void
   onSelectAll: () => void
}

export function DataTable<TData extends { id: string }, TValue>({
   columns,
   data,
   selectedRows,
   onRowSelect,
   onSelectAll,
}: DataTableProps<TData, TValue>) {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   })

   const isAllSelected = selectedRows.length === data.length && data.length > 0

   return (
      <div className="rounded-md border">
         <Table>
            <TableHeader>
               <TableRow className="bg-red-600 text-white hover:bg-red-600">
                  <TableHead>
                     <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={onSelectAll}
                        className="text-white border-white"
                     />
                  </TableHead>
                  {table.getHeaderGroups().map((headerGroup) =>
                     headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="text-white">
                           {header.isPlaceholder
                              ? null
                              : flexRender(
                                 header.column.columnDef.header,
                                 header.getContext()
                              )}
                        </TableHead>
                     ))
                  )}
               </TableRow>
            </TableHeader>
            <TableBody>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                     const isSelected = selectedRows.includes(row.original.id)
                     return (
                        <TableRow key={row.id} data-state={isSelected && "selected"}>
                           <TableCell>
                              <Checkbox
                                 checked={isSelected}
                                 onCheckedChange={() => onRowSelect(row.original.id)}
                              />
                           </TableCell>
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                     )
                  })
               ) : (
                  <TableRow>
                     <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                        No results.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   )
}