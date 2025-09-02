import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"

import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House"
import { ClockCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ClockCounterClockwise"
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

const items = [
  {
    title: "Chung",
    url: "/trang-chu",
    icon: <HouseIcon size={20} weight="duotone" />,
  },
  {
    title: "Lịch sử sửa chữa",
    url: "#",
    icon: <ClockCounterClockwiseIcon size={20} weight="duotone" />,
  },
]

const roleMap = [
  {
    key: "nurse",
    title: "Điều dưỡng",
  },
  {
    key: "doctor",
    title: "Bác sĩ",
  },
  {
    key: "admin",
    title: "Quản trị viên",
  },
  {
    key: "technician",
    title: "Kỹ thuật viên",
  },
  {
    key: "caregiver",
    title: "Hộ lý",
  }
]

export function AppSidebar() {
  const { profile, signOut } = useAuth();

  return (
    <Sidebar className="overflow-hidden">
      <SidebarHeader className="px-3 sm:px-4 h-20 border-b">
        <h1
          className="
              uppercase sm:leading-tight lg:leading-[1.35] text-base sm:text-lg font-extrabold
              bg-gradient-to-r from-[#0193DE] to-[#D92323]
              bg-clip-text text-transparent
            "
        >
          Hệ thống<br />quản lý máy
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chung</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="px-1 py-4 sm:px-2">
        <div className="flex flex-row items-center gap-3 mb-3 px-2">
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate uppercase">{profile?.full_name}</p>
            <p className="text-xs text-gray-500 truncate my-0.5">@{profile?.username}</p>
            <Badge variant="outline" className="px-2 py-0.5 text-xs">{roleMap.find((role) => role.key === profile?.roles?.name)?.title}</Badge>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={signOut} className="hover:cursor-pointer">
              <span>
                <SignOutIcon size={20} weight="duotone" />
              </span>
              <span>Đăng xuất</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}