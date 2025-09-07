import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return 'Cargando...';
  }

  if (data) {
    return <Navigate to={'/'} />
  } else {
    return (
      <>
        <section className='min-h-screen flex items-center justify-center bg-gray-100 p-2'>
          <div className="min-w-full md:min-w-2xl flex flex-col bg-white shadow-xl rounded-xl relative z-10 overflow-hidden">
            <Outlet />
            <div className="absolute -bottom-36 -left-36 size-60 bg-gradient-to-tl from-primary-50 to-primary-500 -z-10 rotate-45"></div>
          </div>
        </section>
      </>
    )
  }

}
