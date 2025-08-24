"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DotsThreeVerticalIcon } from "@phosphor-icons/react/DotsThreeVertical"
import { FunnelSimpleIcon } from "@phosphor-icons/react/FunnelSimple"

export type Equipment = {
  id: string
  user_id: string
  name: string
  model: string
  place_of_origin: string
  manufacture_year: number
  function: string
  delivery_date: Date
  location: string
  status: "available" | "unavailable" | "in_use"
}

export const columns: ColumnDef<Equipment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0! font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên thiết bị
          <FunnelSimpleIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "model",
    header: () => <div className="font-bold">Model</div>,
  },
  {
    accessorKey: "place_of_origin",
    header: () => <div className="font-bold">Nơi sản xuất</div>,
  },
  {
    accessorKey: "manufacture_year",
    header: () => <div className="font-bold">Năm sản xuất</div>,
  },
  {
    accessorKey: "function",
    header: () => <div className="font-bold">Chức năng</div>,
  },
  {
    accessorKey: "delivery_date",
    header: () => <div className="font-bold">Ngày nhập kho</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("delivery_date"))
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="font-bold">Vị trí</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="font-bold">Trạng thái</div>,
    cell: ({ row }) => {
      const status = row.getValue("status")
      let color = ""
      switch (status) {
        case "available":
          color = "green"
          break
        case "unavailable":
          color = "red"
          break
        case "in_use":
          color = "orange"
          break
        default:
          color = "gray"
      }
      return (
        <span
          style={{
            color,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {(status as string).replace("_", " ")}
        </span>
      )
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="font-bold">Hành động</div>,
    cell: ({ row }) => {
      const equipment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsThreeVerticalIcon size={24} weight="duotone" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-bold">Hành động</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(equipment.id)}
            >
              Copy equipment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View equipment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
]