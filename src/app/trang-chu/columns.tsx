"use client"

import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DotsThreeVerticalIcon } from "@phosphor-icons/react/DotsThreeVertical"
import { FunnelSimpleIcon } from "@phosphor-icons/react/FunnelSimple"
import { EyeIcon } from "@phosphor-icons/react/Eye"
import { PencilSimpleIcon } from "@phosphor-icons/react/PencilSimple"
import { TrashIcon } from "@phosphor-icons/react/Trash"

import { Equipment } from "@/lib/type"

export const defaultVisibleColumns = {
  name: true,
  model: true,
  place_of_origin: false,
  manufacture_year: false,
  function: true,
  delivery_date: false,
  location: true,
  status: true,
  actions: true,
}

export function useEquipmentColumns(): ColumnDef<Equipment>[] {
  const router = useRouter();

  return [
    {
      accessorKey: "id",
    },
    {
      accessorKey: "name",
      enableHiding: false,
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
      enableHiding: false,
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
        return date.toLocaleDateString('vi-VN')
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
      enableHiding: false,
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
              {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(equipment.id)}
            >
              Copy equipment ID
            </DropdownMenuItem> */}
              <DropdownMenuItem onClick={
                () => {
                  router.push(`/trang-chu/thiet-bi/${equipment.id}`)
                }}
              >
                <EyeIcon weight="duotone" /> Xem chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PencilSimpleIcon weight="duotone" /> Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem className="group hover:!bg-red-100 hover:!text-red-700">
                <TrashIcon weight="duotone" className="group-hover:text-red-700" /> Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ]
}
