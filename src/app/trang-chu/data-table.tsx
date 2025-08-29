"use client"

import { useState } from "react"
import Link from "next/link"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { EyeIcon } from "@phosphor-icons/react/dist/icons/Eye"
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown"

import { defaultVisibleColumns } from "./columns"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  visibilityOptions: { label: string, value: string }[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  visibilityOptions,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultVisibleColumns)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const onColumnVisibilityChange = (columnId: string, isVisible: boolean) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: isVisible,
    }))
  }

  return (
    <div className="rounded-md">
      <div className="flex justify-between items-center pb-4">
        <Input
          placeholder="Tìm kiếm tên thiết bị..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="hidden sm:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Hiển thị cột <CaretDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={onColumnVisibilityChange.bind(null, column.id)}
                    >
                      {visibilityOptions.find(e => e.value === column.id)?.label || column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="hidden sm:block overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Mobile view, will change to dynamic form later */}
      <div className="flex flex-col gap-3 sm:hidden">
        {
          table.getRowModel().rows.map(equipment => (
            <Card key={equipment.getValue('name')}>
              <CardHeader>
                <CardTitle>{equipment.getValue('name')}</CardTitle>
                <CardDescription>{equipment.getValue('function')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Model: <span className="font-bold">{equipment.getValue('model')}</span></p>
                <p>Vị trí: <span className="font-bold">{equipment.getValue('location')}</span></p>
                <p>Ngày giao hàng: <span className="font-bold">{equipment.getValue('delivery_date').toLocaleDateString('vi-VN')}</span></p>
                <p>Tình trạng: <span className="font-bold">{equipment.getValue('status')}</span></p>
              </CardContent>
              <CardFooter>
                <Link href={`/trang-chu/thiet-bi/${equipment.getValue('id')}`} className="w-full">
                  <Button className="w-full">
                    <EyeIcon className="size-5" size={32} weight="duotone" /> Xem chi tiết
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  )
}
