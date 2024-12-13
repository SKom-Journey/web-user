import { NotFound, Base, BaseAdmin } from "@/pages";
import { MenuPage } from "@/pages/core/client/menus";
import { ChatPage } from "@/pages/core/client/chat";
import { CartPage } from "@/pages/core/client/cart";
import LoginUserPage from "@/pages/core/client/auth/LoginUserPage";
import RegisterPage from "@/pages/core/client/auth/RegisterPage";
import { AuthClient } from "@/pages/core/client/base/auth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { QrPageAdmin } from "@/pages/core/admin/qr";
import { IncomingOrderPageAdmin } from "@/pages/core/admin/order";
import { CategoryPageAdmin } from "@/pages/core/admin/category";
import { MenuPageAdmin } from "@/pages/core/admin/menu";
import OrderSuccessPage from "@/pages/core/client/menus/components/OrderSuccessPage";
import { AuthAdmin } from "@/pages/core/admin/base/auth";
import LoginAdminPage from "@/pages/core/admin/auth/LoginAdminPage";
import Detail from "@/pages/core/client/base/detail";
import MenuDetail from "@/pages/core/client/menus/components/MenuDetail";
import ScanTablePage from "@/pages/core/client/static/ScanTablePage";
import ProfilePage from "@/pages/core/client/profile";
import ThankYouPage from "@/pages/core/client/static/ThankYouPage";
import Static from "@/pages/core/client/base/static";

const router = createBrowserRouter([
   {
      path: '/detail',
      element: <Detail />,
      children: [
         {
            index: true,
            element: <Navigate to="/menu" />
         },
         {
            path: ':menuId',
            element: <MenuDetail />
         }
      ]
   },
   {
      path: '/',
      element: <Base />,
      children: [
         {
            index: true,
            element: <Navigate to="/menu" />
         },
         {
            path: 'me',
            element: <ProfilePage />,
         },
         {
            path: 'menu',
            element: <MenuPage />,
         },
         {
            path: 'chat',
            element: <ChatPage />,
         },
         {
            path: 'cart',
            element: <CartPage />,
         },
         {
            path: 'order-success',
            element: <OrderSuccessPage />,
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
      path: '/auth-admin',
      element: <AuthAdmin />,
      children: [
         {
            index: true,
            element: <Navigate to="/auth-admin/login" />
         },
         {
            path: 'login',
            element: <LoginAdminPage />,
         }
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
   },
   {
      path: '/static',
      element: <Static />,
      children: [
         {
            index: true,
            element: <Navigate to="thank-you" />,
         },
         {
            path: 'thank-you',
            element: <ThankYouPage />
         },
         {
            path: 'scan-table',
            element: <ScanTablePage />,
         },
      ]
   }
]);

export default router;