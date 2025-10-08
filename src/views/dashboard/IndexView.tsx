import { getAdminStats, getWriterStats } from "@/API/WriterAPI"
import AdminDashboard from "@/components/dashboard/AdminDashboard"
import WriterDashboard from "@/components/dashboard/WriterDashboard"
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"

export default function IndexView() {
  const { data: authData, isLoading: authLoading } = useAuth()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['writer-stats'],
    queryFn: getWriterStats,
    enabled: !!authData && authData.role === 'writer',
  })

  const { data: statsAdmin, isLoading: statsLoadingAdmin } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: getAdminStats,
    enabled: !!authData && authData.role === 'admin',
  })

  if (authLoading || statsLoading || statsLoadingAdmin) return 'Cargando...'

  if (authData?.role === 'writer' && stats) {
    return <WriterDashboard stats={stats} />
  } else if (authData?.role === 'admin' && statsAdmin) {
    return <AdminDashboard stats={statsAdmin} />
  }

  return null
}
