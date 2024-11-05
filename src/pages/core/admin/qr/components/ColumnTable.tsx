import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
   id: string
   no_table: string
}

export const columns: ColumnDef<Payment>[] = [
   {
      accessorKey: "no_table",
      header: "No Table",
   },
   {
      accessorKey: "actions",
      header: "Actions",
   }
]
