"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

import { CalendarBlankIcon } from "@phosphor-icons/react"

import { addMaintenanceHistory } from "@/utils/supabase"

const FormSchema = z.object({
  maintenance_date: z.date().min(new Date('2001-01-01'), {
    message: 'Ngày bàn giao phải sau ngày 01 tháng 01 năm 2001'
  }),
  description: z.string().min(2, {
    message: "Mô tả phải có ít nhất 2 ký tự.",
  }),
  performed_by: z.string().min(1, {
    message: "Người thực hiện không được để trống.",
  }),
  condition: z.string().min(2, {
    message: "Tình trạng phải có ít nhất 2 ký tự.",
  }),
  location: z.string().min(2, {
    message: "Vị trí phải có ít nhất 2 ký tự.",
  }),
})

export function MaintenanceHistoryForm({ equipment_id }: { equipment_id: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      maintenance_date: new Date(),
      description: "",
      performed_by: "",
      condition: "",
      location: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formattedData = {
        equipment_id,
        ...data,
        maintenance_date: format(data.maintenance_date, "yyyy-MM-dd"),
      }
      const error = await addMaintenanceHistory(formattedData);
      if (error) {
        throw error;
      }
      toast.success("Thêm lịch sử thành công!");
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi thêm lịch sử bảo trì:", error);
      toast.error("Đã xảy ra lỗi khi thêm lịch sử.");
    }
    // const formattedData = {
    //   ...data,
    //   maintenance_date: format(data.maintenance_date, "yyyy-MM-dd"),
    // };
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(formattedData, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="maintenance_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày bảo trì</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span>Chọn ngày bảo trì</span>
                        )}
                        <CalendarBlankIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập mô tả tình trạng thiết bị" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tình trạng</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="Chọn tình trạng thiết bị" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="good">Hoạt động tốt</SelectItem>
                    <SelectItem value="replaced">Đã thay thế</SelectItem>
                    <SelectItem value="needs_repair">Cần sửa chữa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vị trí</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập vị trí" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="performed_by"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Người thực hiện</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên người thực hiện" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button className="w-fit" type="submit">
            Lưu lịch sử bảo trì
          </Button>
        </div>
      </form>
    </Form>
  )
}
