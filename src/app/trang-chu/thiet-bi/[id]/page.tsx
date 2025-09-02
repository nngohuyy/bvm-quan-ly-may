"use client"

import { use, useEffect, useState } from 'react'

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from "@/components/ui/skeleton"

import { PlusIcon } from '@phosphor-icons/react/Plus'
import { TrashIcon } from '@phosphor-icons/react/Trash'
import { FloppyDiskIcon } from '@phosphor-icons/react/FloppyDisk'
import { ListBulletsIcon } from '@phosphor-icons/react/ListBullets'
import { PencilSimpleIcon } from '@phosphor-icons/react/PencilSimple'
import { ClockCounterClockwiseIcon } from '@phosphor-icons/react/ClockCounterClockwise'

import { mockEquipments } from '@/mocks/equipment'
import { getEquipmentWithHistory } from '@/utils/supabase'
import { Equipment } from '@/lib/type'
import { formatTimestamp } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

function EditFormDialog({ equipment }: { equipment: typeof mockEquipments[0] | undefined }) {
  const editEquipmentFormInput = [
    {
      label: "Tên thiết bị",
      name: "name",
      defaultValue: equipment?.name
    },
    {
      label: "Model",
      name: "model",
      defaultValue: equipment?.model
    },
    {
      label: "Nơi sản xuất",
      name: "place_of_origin",
      defaultValue: equipment?.place_of_origin
    },
    {
      label: "Năm sản xuất",
      name: "manufacture_year",
      defaultValue: equipment?.manufacture_year
    },
    {
      label: "Chức năng",
      name: "function",
      defaultValue: equipment?.function,
    },
    {
      label: "Ngày bàn giao",
      name: "delivery_date",
      defaultValue: equipment?.delivery_date.toLocaleString()
    },
    {
      label: "Vị trí đặt",
      name: "location",
      defaultValue: equipment?.location
    },
  ]

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='default'>
            <PencilSimpleIcon className='size-5' weight='duotone' /> Chỉnh sửa
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin thiết bị</DialogTitle>
            <DialogDescription>
              Thực hiện thay đổi cho thiết bị của bạn tại đây. Nhấp vào &quot;Lưu thay đổi&quot; khi hoàn tất.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className='h-[400px]'>
            <div className="grid gap-4">
              {
                editEquipmentFormInput.map((field) => (
                  <div className="grid gap-3" key={field.name}>
                    <Label htmlFor={`${field.name}-1`}>{field.label}</Label>
                    <Input id={`${field.name}-1`} name={field.name} defaultValue={field.defaultValue} />
                  </div>
                ))
              }
            </div>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Hủy</Button>
            </DialogClose>
            <Button type="submit"><FloppyDiskIcon className='size-5' weight='duotone' /> Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

function DeleteAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>
          <TrashIcon className='size-5' weight='duotone' /> Xóa thiết bị
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có hoàn toàn chắc chắn không?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Nó sẽ xóa vĩnh viễn thiết bị của bạn và
            xóa dữ liệu của bạn khỏi máy chủ của chúng tôi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction>Tiếp tục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function EquipmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [equipment, setEquipment] = useState<Equipment>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = use(params)

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      const equipment = await getEquipmentWithHistory(id);
      setEquipment(equipment);
      setLoading(false);
    }

    fetchEquipmentDetails();
  }, [id])

  return (
    loading ?
      <div className='flex flex-col gap-4'>
        <Skeleton className='h-60' />
        <Skeleton className='h-60' />
      </div> :
      <div className='grid gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex text-xl items-center gap-2'>
              <ListBulletsIcon size={`1.5rem`} weight='duotone' />
              Thông tin cơ bản
            </CardTitle>
            <CardAction className='hidden sm:flex gap-2'>
              <EditFormDialog equipment={equipment} />
              <DeleteAlertDialog />
            </CardAction>
          </CardHeader>
          <CardContent className='flex flex-col sm:grid grid-cols-3 gap-2'>
            <p className='font-bold text-gray-500'>
              Tên thiết bị: <span className='font-normal text-black'>{equipment?.name}</span>
            </p>
            <p className='font-bold text-gray-500'>
              Model: <span className='font-normal text-black'>{equipment?.model}</span>
            </p>
            <p className='font-bold text-gray-500'>
              Nơi sản xuất: <span className='font-normal text-black'>{equipment?.place_of_origin}</span>
            </p>
            <p className='font-bold text-gray-500'>
              Năm sản xuất: <span className='font-normal text-black'>{equipment?.manufacture_year}</span>
            </p>
            <p className='font-bold text-gray-500'>
              Ngày bàn giao: <span className='font-normal text-black'>{formatTimestamp(equipment?.delivery_date ? equipment.delivery_date.toLocaleString() : '')}</span>
            </p>
            <p className='font-bold text-gray-500'>
              Vị trí đặt: <span className='font-normal text-black'>{equipment?.location}</span>
            </p>
            <p className='font-bold text-gray-500 flex items-center gap-2'>
              Trạng thái:
              {equipment?.status === "available" ? (
                <Badge className='rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5'>
                  <span className='size-1.5 rounded-full bg-green-600 dark:bg-green-400' aria-hidden='true' />
                  Bình thường
                </Badge>
              ) : equipment?.status === "under_maintenance" ? (
                <Badge className='bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive rounded-full border-none focus-visible:outline-none'>
                  <span className='bg-destructive size-1.5 rounded-full' aria-hidden='true' />
                  Đang bảo trì
                </Badge>
              ) : null}
            </p>
            <p className='font-bold text-gray-500'>
              Chức năng: <span className='font-normal text-black'>{equipment?.function}</span>
            </p>
          </CardContent>
          <CardFooter className='justify-end'>
            <CardAction className='flex gap-2 sm:hidden'>
              <EditFormDialog equipment={equipment} />
              <DeleteAlertDialog />
            </CardAction>
          </CardFooter>
        </Card>
        <Card className='max-w-full overflow-hidden'>
          <CardHeader>
            <CardTitle className="flex text-xl items-center gap-2">
              <ClockCounterClockwiseIcon size="1.5rem" weight="duotone" />
              Lịch sử sửa chữa
            </CardTitle>
            <CardAction className='hidden sm:block'>
              <Button variant='default'>
                <PlusIcon className='size-5' weight='duotone' /> Thêm lịch sử sửa chữa
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <table className="block overflow-x-auto whitespace-nowrap border-separate border-spacing-y-4 border-spacing-x-0">
              <thead className="bg-white sticky top-0">
                <tr>
                  <th className="text-left pr-10 py-0">Ngày sửa chữa</th>
                  <th className="text-left pr-10 py-0">Mô tả</th>
                  <th className="text-left pr-10 py-0">Người thực hiện</th>
                  <th className="text-left pr-10 py-0">Vị trí sửa chữa</th>
                  <th className="text-left pr-10 py-0">Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {equipment?.maintenance_history?.map((repair) => (
                  <tr key={repair.id}>
                    <td className="pr-10 py-0">
                      {formatTimestamp(repair.maintenance_date.toLocaleString())}
                    </td>
                    <td className="pr-10 py-0">{repair.description}</td>
                    <td className="pr-10 py-0">{repair.profiles.full_name}</td>
                    <td className="pr-10 py-0">{repair.location}</td>
                    <td className="pr-10 py-0">
                      {
                        repair.condition === 'good' ? (
                          <Badge variant='outline'>
                            Hoạt động tốt
                          </Badge>
                        ) : repair.condition === 'replaced' ? (
                          <Badge variant='default'>
                            Đã thay thế
                          </Badge>
                        ) : <Badge variant='destructive'>
                          Cần sửa chữa
                        </Badge>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
          <CardFooter className='justify-end'>
            <CardAction className='flex gap-2 sm:hidden'>
              <Button variant='default'>
                <PlusIcon className='size-5' weight='duotone' /> Thêm lịch sử sửa chữa
              </Button>
            </CardAction>
          </CardFooter>
        </Card>

      </div>
  )
}