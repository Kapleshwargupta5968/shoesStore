import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import ProtectedRoutes from "./ProtectedRoutes";
import Product from "../pages/product/Product";
import ProductDetails from "../pages/product/ProductDetails";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Dashboard from "../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/signin",
                element: <Signin />
            },
            {
                path: "/products",
                element: <ProtectedRoutes allowedRoles={["User"]}>
                    <Product />
                </ProtectedRoutes>
            },
            {
                path: "/product/:id",
                element: <ProtectedRoutes allowedRoles={["User"]}>
                    <ProductDetails />
                </ProtectedRoutes>
            },
            {
                path: "/cart",
                element: <ProtectedRoutes allowedRoles={["User"]}>
                    <Cart />
                </ProtectedRoutes>
            },
            {
                path: "/checkout",
                element: <ProtectedRoutes allowedRoles={["User"]}>
                    <Checkout />
                </ProtectedRoutes>
            },
            {
                path:"/dashboard",
                element:(
                    <ProtectedRoutes allowedRoles={["Admin","User"]}>
                    <Dashboard />
                </ProtectedRoutes>
                )
            }
        ]
    }
]);