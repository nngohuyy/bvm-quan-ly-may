"use client"

import { FormEvent } from 'react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpUser } from "@/utils/supabase"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.username.value + '@benhvienmattphcm.com';
    const password = e.currentTarget.password.value;
    const full_name = e.currentTarget.full_name.value;
    const username = e.currentTarget.username.value;
    const role_name = 'nurse';
    await signUpUser(email, password, full_name, username, role_name);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Đăng ký tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full_name">Họ và tên</Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    required />
                </div>
                <Button type="submit" className="w-full">
                  Đăng ký
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}