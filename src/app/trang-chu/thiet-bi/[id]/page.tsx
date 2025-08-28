"use client"

import { use } from 'react'

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

import { PlusIcon } from '@phosphor-icons/react/Plus'
import { ListBulletsIcon } from '@phosphor-icons/react/ListBullets'
import { PencilSimpleIcon } from '@phosphor-icons/react/PencilSimple'
import { ClockCounterClockwiseIcon } from '@phosphor-icons/react/ClockCounterClockwise'

import { mockEquipments } from '@/mocks/equipment'

export default function EquipmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const equipment = mockEquipments.find((eq) => eq.id === id)

  return (
    <div className='grid gap-4'>
      <Card>
        <CardHeader>
          <CardTitle className='flex text-xl items-center gap-2'>
            <ListBulletsIcon size={`1.5rem`} weight='duotone' />
            Thông tin cơ bản
          </CardTitle>
          <CardAction className='hidden sm:block'>
            <Button variant='outline' size='sm'>
              <PencilSimpleIcon /> Chỉnh sửa
            </Button>
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
            Ngày bàn giao: <span className='font-normal text-black'>{equipment?.delivery_date ? equipment.delivery_date.toLocaleDateString('vi-VN') : ''}</span>
          </p>
          <p className='font-bold text-gray-500'>
            Vị trí đặt: <span className='font-normal text-black'>{equipment?.location}</span>
          </p>
          <p className='font-bold text-gray-500'>
            Trạng thái: <span className='font-normal text-black'>{equipment?.status}</span>
          </p>
          <p className='font-bold text-gray-500'>
            Chức năng: <span className='font-normal text-black'>{equipment?.function}</span>
          </p>
        </CardContent>
        <CardFooter>
          <CardAction className='block sm:hidden'>
            <Button variant='outline' size='sm'>
              <PencilSimpleIcon /> Chỉnh sửa
            </Button>
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
            <Button variant="outline" size="sm">
              <PlusIcon /> Thêm sửa chữa
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
              {equipment?.maintenance_history.map((repair) => (
                <tr key={repair.id}>
                  <td className="pr-10 py-0">
                    {repair.maintenance_date.toLocaleDateString("vi-VN")}
                  </td>
                  <td className="pr-10 py-0">{repair.description}</td>
                  <td className="pr-10 py-0">{repair.performed_by}</td>
                  <td className="pr-10 py-0">{repair.location}</td>
                  <td className="pr-10 py-0">{repair.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardFooter>
          <CardAction className='block sm:hidden'>
            <Button variant="outline" size="sm">
              <PlusIcon /> Thêm sửa chữa
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

    </div>
  )
}