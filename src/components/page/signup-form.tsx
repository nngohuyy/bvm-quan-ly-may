"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getAllRoleNames } from "@/utils/supabase"
import { signUpUser } from "@/app/(auth)/action"

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "Họ và tên phải có ít nhất 2 ký tự",
  }),
  username: z.string().min(2, {
    message: "Tên đăng nhập phải có ít nhất 2 ký tự",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự",
  }),
  role_name: z.string().min(2, {
    message: "Vui lòng chọn vai trò",
  }),
})

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [roleNames, setRoleNames] = useState<string[]>([]);

  useEffect(() => {
    getAllRoleNames().then((roles) => {
      if (Array.isArray(roles)) {
        setRoleNames(roles);
      }
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      username: "",
      password: "",
      role_name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const email = values.username + '@benhvienmattphcm.com';
    const password = values.password;
    const full_name = values.full_name;
    const username = values.username;
    const role_name = values.role_name;
    await signUpUser(email, password, full_name, username, role_name);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Đăng ký tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập họ và tên đầy đủ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên đăng nhập" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Mật khẩu" {...field} />
                    </FormControl>
                    <FormDescription>Mật khẩu phải có ít nhất 6 ký tự.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vai trò</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Vai trò</SelectLabel>
                          {roleNames.map((role) => (
                            <SelectItem key={role} value={role} className="capitalize">
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>Chọn vai trò của bạn trong hệ thống.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-6">
                <Button type="submit" className="w-full">
                  Đăng ký
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}