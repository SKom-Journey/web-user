import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import router from '@/routes';
import './index.css'
import '@/assets/css/custom.css'
import Modal from 'react-modal';
import { GoogleOAuthProvider } from '@react-oauth/google';
import oauthConfig from './config/oauth';

const queryClient = new QueryClient()

Modal.setAppElement('#wrapper');

createRoot(document.getElementById('wrapper')!).render(
  <QueryClientProvider client={queryClient} >
    <GoogleOAuthProvider clientId={oauthConfig.clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </QueryClientProvider>,
)
