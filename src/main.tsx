import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import router from '@/routes';
import './index.css'
import '@/assets/css/custom.css'
import Modal from 'react-modal';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient()

Modal.setAppElement('#wrapper');

createRoot(document.getElementById('wrapper')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient} >
        <GoogleOAuthProvider clientId="403281286954-3bmc66dtocfsgbuvk7p6kpi5olq6f472.apps.googleusercontent.com">
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
  </StrictMode>,
)
