import { NotFound } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
   {
      path: '*',
      element: <NotFound />,
   },
])

export default router