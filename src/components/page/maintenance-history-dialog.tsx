"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { PlusIcon, PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr"
import { MaintenanceHistoryForm } from "@/components/page/maintenance-history-form"
import { EditMaintenanceHistoryForm } from "@/components/page/maintenance-history-form"
import { MaintenanceHistory } from "@/lib/type"

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

export function EditMaintenanceHistoryDialog({
  id,
  equipment_id,
  repair,
}: {
  id: string
  equipment_id: string
  repair: MaintenanceHistory
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size={`icon`}>
          <PencilSimpleIcon className='size-5' weight='duotone' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin lịch sử bảo trì</DialogTitle>
          <DialogDescription>
            Thực hiện chỉnh sửa lịch sử bảo trì cho thiết bị của bạn tại đây. Nhấp vào &quot;Lưu lịch sử bảo trì&quot; khi hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <EditMaintenanceHistoryForm id={id} equipment_id={equipment_id} repair={repair} />
      </DialogContent>
    </Dialog>
  )
}
