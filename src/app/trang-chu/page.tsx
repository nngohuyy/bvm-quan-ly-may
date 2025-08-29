"use client"

import { columns, visibilityOptions } from "./columns"
import { DataTable } from "./data-table"
import { mockEquipments } from "@/mocks/equipment"

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Bảng điều khiển</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Chào mừng bạn đến với hệ thống quản lý máy</p>
      </div>
      <DataTable
        columns={columns}
        visibilityOptions={visibilityOptions}
        data={mockEquipments}
      />
    </div>
  )
}
