import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import { RouterProvider,createBrowserRouter,Outlet } from "react-router-dom";
import Appo from "./Appo";
const App = () => {
    return<div>
    <Outlet />
    </div>
}
 const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<Appo />,
        children:[
            {
                path:"/header",
                element:<Header />,
            },
        ],
    },
 ])
const root1 = ReactDOM.createRoot(document.getElementById("root"));
root1.render(<RouterProvider router={appRouter} />);






