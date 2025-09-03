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

import { addMaintenanceHistory } from "@/utils/supabase"
import { useAuth } from "@/context/AuthContext"

const FormSchema = z.object({
  description: z.string().min(2, {
    message: "Mô tả phải có ít nhất 2 ký tự.",
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
      description: "",
      condition: "",
      location: "",
    },
  })

  const { profile } = useAuth();
  const performed_by = profile?.id || "";

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const error = await addMaintenanceHistory({ equipment_id, performed_by, ...data });
      if (error) {
        throw error;
      }
      toast.success("Thêm lịch sử thành công!");
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi thêm lịch sử bảo trì:", error);
      toast.error("Đã xảy ra lỗi khi thêm lịch sử.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid gap-4">
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
