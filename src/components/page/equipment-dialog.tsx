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
import { AddEquipmentForm, EditEquipmentForm } from "./equipment-form"
import { EquipmentFormData } from "@/lib/type"

export function AddFormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary"><PlusIcon />Thêm thiết bị</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm thông tin thiết bị</DialogTitle>
          <DialogDescription>
            Thực hiện thêm cho thiết bị của bạn tại đây. Nhấp vào &quot;Lưu thay đổi&quot; khi hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <AddEquipmentForm />
      </DialogContent>
    </Dialog>
  )
}

export function EditFormDialog({
  id,
  initialData,
}: {
  id: string
  initialData: EquipmentFormData
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary"><PlusIcon />Chỉnh sửa thiết bị</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin thiết bị</DialogTitle>
          <DialogDescription>
            Thực hiện chỉnh sửa cho thiết bị của bạn tại đây. Nhấp vào &quot;Lưu thay đổi&quot; khi hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <EditEquipmentForm id={id} initialData={initialData} />
      </DialogContent>
    </Dialog>
  )
}
