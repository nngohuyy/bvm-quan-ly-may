"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@phosphor-icons/react/dist/ssr"
import { MaintenanceHistoryForm } from "@/components/page/maintenance-history-form"

export function MaintenanceHistoryDialog({equipment_id}: {equipment_id: string}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary"><PlusIcon />Thêm lịch sử bảo trì</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm thông tin lịch sử bảo trì</DialogTitle>
          <DialogDescription>
            Thực hiện thêm lịch sử bảo trì cho thiết bị của bạn tại đây. Nhấp vào &quot;Lưu lịch sử bảo trì&quot; khi hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <MaintenanceHistoryForm equipment_id={equipment_id} />
      </DialogContent>
    </Dialog>
  )
}
