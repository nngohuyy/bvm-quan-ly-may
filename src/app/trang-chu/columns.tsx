"use client"

import Link from "next/link"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { FunnelSimpleIcon } from "@phosphor-icons/react/FunnelSimple"
import { EyeIcon } from "@phosphor-icons/react/Eye"

import { Equipment } from "@/lib/type"
import { Badge } from "@/components/ui/badge"

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
  { label: "Năm bàn giao", value: "delivery_date" },
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
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="max-w-2xs truncate">{row.getValue("function")}</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("function")}</p>
          </TooltipContent>
        </Tooltip>
      )
    }
  },
  {
    accessorKey: "delivery_date",
    header: () => <div className="font-bold">Năm bàn giao</div>,
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
      let translation = ""
      let classNameBadge = ""
      let classNameDot = ""
      switch (status) {
        case "available":
          classNameBadge = 'rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5'
          classNameDot = 'size-1.5 rounded-full bg-green-600 dark:bg-green-400'
          translation = "Đang hoạt động"
          break
        case "under_maintenance":
          classNameBadge = 'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive rounded-full border-none focus-visible:outline-none'
          classNameDot = 'bg-destructive size-1.5 rounded-full'
          translation = "Đang bảo trì"
          break
        default:
          classNameBadge = ''
          classNameDot = ''
      }
      return (
        <Badge className={classNameBadge}>
          <span className={classNameDot} aria-hidden='true' />
          {translation}
        </Badge>
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
