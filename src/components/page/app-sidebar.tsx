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

const items = [
  {
    title: "Chung",
    url: "#",
    icon: <HouseIcon size={20} weight="duotone" />,
  },
  {
    title: "Lịch sử sửa chữa",
    url: "#",
    icon: <ClockCounterClockwiseIcon size={20} weight="duotone" />,
  },
]

const user = {
  name: "Ngô Thị Hồng Cúc",
  username: "hongcuc2005",
  title: "Điều dưỡng",
}

export function AppSidebar() {
  return (
    <Sidebar className="overflow-hidden">
      <SidebarHeader className="px-3 sm:px-4">
        <h1
          className="
              uppercase sm:leading-tight lg:leading-[1.35] text-base sm:text-lg lg:text-xl font-extrabold
              bg-gradient-to-r from-[#0193DE] to-[#D92323]
              bg-clip-text text-transparent
            "
        >
          Hệ thống<br />quản lý máy
        </h1>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chung</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </a>
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
            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate uppercase">{user.name}</p>
            <p className="text-xs text-gray-500 truncate my-0.5">@{user.username}</p>
            <Badge variant="default">{user.title}</Badge>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <span>
                  <SignOutIcon size={20} weight="duotone" />
                </span>
                <span>Đăng xuất</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}