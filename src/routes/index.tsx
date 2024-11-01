import { NotFound, Base, BaseAdmin } from "@/pages";
import { MenuPage } from "@/pages/core/client/menus";
import { ChatPage } from "@/pages/core/client/chat";
import { CartPage } from "@/pages/core/client/cart";
import LoginUserPage from "@/pages/auth/client/LoginUserPage";
import RegisterPage from "@/pages/auth/client/RegisterPage";
import { AuthClient } from "@/pages/core/client/base/auth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { QrPageAdmin } from "@/pages/core/admin/qr";
import { IncomingOrderPageAdmin } from "@/pages/core/admin/order";
import { CategoryPageAdmin } from "@/pages/core/admin/category";
import { MenuPageAdmin } from "@/pages/core/admin/menu";

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
      ],
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
   {
      path: '/admin',
      element: <BaseAdmin />,
      children: [
         {
            index: true,
            element: <Navigate to="manage-qr" />,
         },
         {
            path: 'manage-qr',
            element: <QrPageAdmin />,
         },
         {
            path: 'incoming-order',
            element: <IncomingOrderPageAdmin />
         },
         {
            path: 'manage-category',
            element: <CategoryPageAdmin />
         },
         {
            path: 'manage-menu',
            element: <MenuPageAdmin />
         }
      ],
   }
]);

export default router;