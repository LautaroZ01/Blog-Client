import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SocketProvider } from './context/SocketProvider.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <Router />
      </SocketProvider>
    </QueryClientProvider>
  </StrictMode>,
)
