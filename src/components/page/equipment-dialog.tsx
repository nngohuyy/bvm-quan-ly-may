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
import { AddEquipmentForm } from "./equipment-form"

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
