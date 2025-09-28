import { createClient } from '@/utils/supabase/server'
import { AppSidebarClient } from '@/components/page/app-sidebar-client'

export async function AppSidebar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <AppSidebarClient user={{ full_name: null, username: null, role: null }} />
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`
        *,
        roles(name)
      `)
    .eq('id', user.id)
    .single()
  if (error) {
    console.log('Error fetching profile:', error.message)
  }

  const userProfile = {
    full_name: profile?.full_name ?? null,
    username: profile?.username ?? null,
    role: profile?.roles?.name ?? null,
  }

  return <AppSidebarClient user={userProfile} />
}