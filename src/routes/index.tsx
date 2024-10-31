import { NotFound, Base } from "@/pages";
import { MenuPage } from "@/pages/core/client/menus";
import { ChatPage } from "@/pages/core/client/chat";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { CartPage } from "@/pages/core/client/cart";
import LoginUserPage from "@/pages/auth/client/LoginUserPage";
import RegisterPage from "@/pages/auth/client/RegisterPage";
import { AuthClient } from "@/pages/core/client/base/auth";

const router = createBrowserRouter([
   {
      path: '/',
      element: <Base />,
      children: [
         {
            index: true,
            element: <Navigate to="/menu" />
         },
         {
            path: '/menu',
            element: <MenuPage />,
         },
         {
            path: '/chat',
            element: <ChatPage />,
         },
         {
            path: '/cart',
            element: <CartPage />,
         },
         {
            path: '*',
            element: <NotFound />,
         },
      ]
   },
   {
      path: '/auth',
      element: <AuthClient />,
      children: [
         {
            index: true,
            element: <Navigate to="/login" />
         },
         {
            path: '/auth/login',
            element: <LoginUserPage />,
         },
         {
            path: '/auth/register',
            element: <RegisterPage />,
         },
      ]
   },
])

export default router