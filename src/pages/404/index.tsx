import { Link } from "react-router-dom"

export const NotFound: React.FC = () => {
   return (
      <>
         <section className="bg-white h-screen max-h-screen">
            <div className=" px-4 mx-auto">
               <div className="m-auto max-w-screen-sm text-center">
                  <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-600">404</h1>
                  <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                  <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                  <Link to={'/menu'} className="inline-flex text-white bg-red-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Menus</Link>
               </div>
            </div>
         </section>
      </>
   )
}