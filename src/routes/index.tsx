import { NotFound, Base } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
   {
      path: '/',
      element: <Base />,
      children: [
         {
            path: '*',
            element: <NotFound />,
         },
      ]
   },
])

export default router