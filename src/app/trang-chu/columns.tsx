"use client"

import Link from "next/link"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import { FunnelSimpleIcon } from "@phosphor-icons/react/FunnelSimple"
import { EyeIcon } from "@phosphor-icons/react/Eye"

import { Equipment } from "@/lib/type"

export const defaultVisibleColumns = {
  id: false,
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

export const visibilityOptions = [
  { label: "ID", value: "id" },
  { label: "Tên thiết bị", value: "name" },
  { label: "Model", value: "model" },
  { label: "Nơi sản xuất", value: "place_of_origin" },
  { label: "Năm sản xuất", value: "manufacture_year" },
  { label: "Chức năng", value: "function" },
  { label: "Ngày nhập kho", value: "delivery_date" },
  { label: "Vị trí", value: "location" },
  { label: "Trạng thái", value: "status" },
  { label: "Hành động", value: "actions" },
]

export const columns: ColumnDef<Equipment>[] = [
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
        <Button asChild size="sm" className="gap-2">
          <Link href={`/trang-chu/thiet-bi/${equipment.id}`}>
            <EyeIcon className="size-5" weight="duotone" /> Xem chi tiết
          </Link>
        </Button>
      )
    }
  },
]
