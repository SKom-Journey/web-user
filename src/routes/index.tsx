import { NotFound, Home } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
   {
      path: '/',
      element: <Home />,
   },
   {
      path: '*',
      element: <NotFound />,
   },
])

export default router