import { useEffect, useState } from "react"
import { Payment, columns } from "./components/ColumnTable"
import { DataTable } from "./components/DataTable"

async function getData(): Promise<Payment[]> {
   return [
      {
         id: "728ed52f",
         no_table: '1',
      },
   ]
}

export const QrPageAdmin = () => {
   const [data, setData] = useState<Payment[]>([])
   const [selectedRows, setSelectedRows] = useState<string[]>([])

   useEffect(() => {
      const fetchData = async () => {
         const result = await getData()
         setData(result)
      }
      fetchData()
   }, [])

   const handleRowSelect = (id: string) => {
      setSelectedRows((prevSelected) =>
         prevSelected.includes(id)
            ? prevSelected.filter((rowId) => rowId !== id)
            : [...prevSelected, id]
      )
   }

   const handleSelectAll = () => {
      if (selectedRows.length === data.length) {
         setSelectedRows([])
      } else {
         setSelectedRows(data.map((row) => row.id))
      }
   }

   return (
      <div className="bg-white">
         <DataTable
            columns={columns}
            data={data}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
         />
      </div>
   )
}