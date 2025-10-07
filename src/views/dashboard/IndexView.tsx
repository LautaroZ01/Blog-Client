import { getWriterStats } from "@/API/WriterAPI"
import WriterDashboard from "@/components/dashboard/WriterDashboard"
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"

export default function IndexView() {
  const { data: authData, isLoading: authLoading } = useAuth()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['writer-stats'],
    queryFn: getWriterStats,
    enabled: !!authData && authData.role === 'writer', // 👈 se ejecuta solo cuando es escritor
  })

  if (authLoading || statsLoading) return 'Cargando...'

  if (authData?.role === 'writer' && stats) {
    return <WriterDashboard stats={stats} />
  }

  return null
}
