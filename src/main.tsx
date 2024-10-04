import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import router from '@/routes';
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('wrapper')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
