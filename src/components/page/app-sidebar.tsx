import { createClient } from '@/utils/supabase/server'
import { AppSidebarClient } from '@/components/page/app-sidebar-client'

export async function AppSidebar() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = {
    email: data.user?.email ?? null,
    username: (data.user as any)?.username ?? data.user?.user_metadata?.username ?? null,
    role: (data.user as any)?.role ?? data.user?.user_metadata?.role ?? null,
  }

  return <AppSidebarClient user={user} />
}