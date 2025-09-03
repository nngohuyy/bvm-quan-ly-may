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
import { Skeleton } from "@/components/ui/skeleton"

import { TrashIcon } from '@phosphor-icons/react/Trash'
import { ListBulletsIcon } from '@phosphor-icons/react/ListBullets'
import { ClockCounterClockwiseIcon } from '@phosphor-icons/react/ClockCounterClockwise'

import { deleteEquipment, getEquipmentWithHistory } from '@/utils/supabase'
import { Equipment } from '@/lib/type'
import { formatTimestamp } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { MaintenanceHistoryDialog } from '@/components/page/maintenance-history-dialog'
import { EditFormDialog } from '@/components/page/equipment-dialog'
import { toast } from 'sonner'

function DeleteAlertDialog({ id }: { id: string }) {
  async function onDelete() {
    try {
      const error = await deleteEquipment(id);
      if (error) throw error;
      toast.success("Xóa thiết bị thành công");
      window.location.href = '/trang-chu';
    } catch (error) {
      console.log(error);
      toast.error("Xóa thiết bị thất bại");
    }
  }
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
          <AlertDialogAction onClick={onDelete}>Tiếp tục</AlertDialogAction>
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
              <EditFormDialog id={id} initialData={{
                name: equipment?.name ?? "",
                model: equipment?.model ?? "",
                place_of_origin: equipment?.place_of_origin ?? "",
                manufacture_year: equipment?.manufacture_year ?? new Date().getFullYear(),
                function: equipment?.function ?? "",
                delivery_date: equipment?.delivery_date ?? new Date(),
                location: equipment?.location ?? ""
              }} />
              <DeleteAlertDialog id={id} />
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
              <EditFormDialog id={id} initialData={{
                name: equipment?.name ?? "",
                model: equipment?.model ?? "",
                place_of_origin: equipment?.place_of_origin ?? "",
                manufacture_year: equipment?.manufacture_year ?? new Date().getFullYear(),
                function: equipment?.function ?? "",
                delivery_date: equipment?.delivery_date ?? new Date(),
                location: equipment?.location ?? ""
              }} />
              <DeleteAlertDialog id={id} />
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
              <MaintenanceHistoryDialog equipment_id={id} />
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
              <MaintenanceHistoryDialog equipment_id={id} />
            </CardAction>
          </CardFooter>
        </Card>
      </div>
  )
}