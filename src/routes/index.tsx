import { NotFound, Base } from "@/pages";
import { MenuPage } from "@/pages/core/client/menus";
import { createBrowserRouter, Navigate } from "react-router-dom";

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
            path: '*',
            element: <NotFound />,
         },
      ]
   },
])

export default router