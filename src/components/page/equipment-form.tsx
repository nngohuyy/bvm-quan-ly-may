"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
    message: "Năm sản xuất không được ở tương lai",
  }),
  function: z.string().min(2, {
    message: "Chức năng phải có ít nhất 2 ký tự.",
  }),
  delivery_date: z.number().int().refine(year => year <= new Date().getFullYear(), {
    message: 'Năm giao hàng không được ở tương lai',
  }),
  location: z.string().min(2, {
    message: "Vị trí đặt phải có ít nhất 2 ký tự.",
  }),
}).refine(data => data.delivery_date >= data.manufacture_year, {
  message: "Năm bàn giao không được trước năm sản xuất.",
  path: ['delivery_date'],
});

const yearDropdownOptions = Array.from({ length: 100 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { label: year.toString(), value: year };
});

export function AddEquipmentForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      model: "",
      place_of_origin: "",
      manufacture_year: new Date().getFullYear(),
      function: "",
      delivery_date: new Date().getFullYear(),
      location: "",
    },
    mode: "onChange",
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
          <div className="grid gap-4 mr-5">
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
            <div className="grid grid-cols-2 items-start gap-4">
              <FormField
                control={form.control}
                name="manufacture_year"
                render={({ field }) => (
                  <FormItem key={form.getValues('manufacture_year')}>
                    <FormLabel>Năm sản xuất</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()} // Change defaultValue to value
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn năm sản xuất" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {yearDropdownOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="delivery_date"
                render={({ field }) => (
                  <FormItem key={form.getValues('delivery_date')} className="flex flex-col">
                    <FormLabel>Năm bàn giao</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn năm bàn giao" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {yearDropdownOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
    mode: "onChange",
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
          <div className="grid gap-4 mr-5">
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
            <div className="grid grid-cols-2 items-start gap-4">
              <FormField
                control={form.control}
                name="manufacture_year"
                render={({ field }) => (
                  <FormItem key={form.getValues('manufacture_year')}>
                    <FormLabel>Năm sản xuất</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()} // Change defaultValue to value
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn năm sản xuất" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {yearDropdownOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="delivery_date"
                render={({ field }) => (
                  <FormItem key={form.getValues('delivery_date')} className="flex flex-col">
                    <FormLabel>Năm bàn giao</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn năm bàn giao" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {yearDropdownOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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