"use client"

import { z } from "zod"
import { toast } from "sonner"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr/CalendarBlank"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addEquipment, editEquipment } from "@/utils/supabase"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên thiết bị phải có ít nhất 2 ký tự.",
  }),
  model: z.string().min(2, {
    message: "Model phải có ít nhất 2 ký tự.",
  }),
  place_of_origin: z.string().min(2, {
    message: "Nơi sản xuất phải có ít nhất 2 ký tự.",
  }),
  manufacture_year: z.number().int().refine(year => year <= new Date().getFullYear(), {
    message: "Năm không được ở tương lai",
  }),
  function: z.string().min(2, {
    message: "Chức năng phải có ít nhất 2 ký tự.",
  }),
  delivery_date: z.date().min(new Date('2023-01-01'), {
    message: 'Ngày bàn giao phải sau ngày 1 tháng 1 năm 2023'
  }),
  location: z.string().min(2, {
    message: "Vị trí đặt phải có ít nhất 2 ký tự.",
  }),
})

export function AddEquipmentForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      model: "",
      place_of_origin: "",
      manufacture_year: new Date().getFullYear(),
      function: "",
      delivery_date: new Date(),
      location: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const error = await addEquipment(data);
      if (error) throw (error);
      toast.success("Thêm thiết bị thành công!");
      window.location.reload();
    } catch (error) {
      console.log("Lỗi khi thêm thiết bị:", error);
      toast.error("Thêm thiết bị thất bại!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <ScrollArea className="h-[400px]">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên thiết bị</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên thiết bị" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập model" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="place_of_origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nơi sản xuất</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập nơi sản xuất" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manufacture_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm sản xuất</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập năm sản xuất"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? Number(value) : undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="function"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chức năng</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập chức năng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delivery_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày bàn giao</FormLabel>
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
                            format(field.value, "PPP")
                          ) : (
                            <span>Chọn ngày bàn giao</span>
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí đặt</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập vị trí đặt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <Button className="w-fit" type="submit">
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </Form>
  )
}

export function EditEquipmentForm({
  id,
  initialData,
}: {
  id: string
  initialData: z.infer<typeof FormSchema>
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const error = await editEquipment(id, data);
      if (error) throw (error);
      toast.success("Cập nhật thiết bị thành công!");
      window.location.reload();
    } catch (error) {
      console.log("Lỗi khi cập nhật thông tin thiết bị:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin thiết bị.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <ScrollArea className="h-[400px]">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên thiết bị</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên thiết bị" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập model" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="place_of_origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nơi sản xuất</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập nơi sản xuất" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manufacture_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm sản xuất</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Nhập năm sản xuất"
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? Number(value) : undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="function"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chức năng</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập chức năng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delivery_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày bàn giao</FormLabel>
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
                            format(field.value, "PPP")
                          ) : (
                            <span>Chọn ngày bàn giao</span>
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí đặt</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập vị trí đặt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <Button className="w-fit" type="submit">
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </Form>
  )
}