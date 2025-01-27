import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ErrorPage from '../Pages/ErrorPage';
import DashboardLayout from '../Layout/DashboardLayout';
import ManageUsers from '../Components/ManageUsers';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import MyProfile from '../Components/MyProfile';
import AddProduct from '../Components/AddProduct';
import MyProducts from '../Components/MyProducts';
import ReviewQueue from '../Components/ReviewQueue';
import Products from '../Pages/Products';
import ProductDetails from '../Pages/ProductDetails';
import ReportedContents from '../Components/ReportedContents';
import ModeratorRoute from './ModeratorRoute';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            },
            {
                path: '/products',
                element: <Products></Products>
            },
            {
                path: '/product-details/:id',
                element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: "manage-users",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "my-profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "add-product",
                element: <AddProduct></AddProduct>
            },
            {
                path: "my-products",
                element: <MyProducts></MyProducts>
            },
            {
                path: "review-queue",
                element: <ModeratorRoute><ReviewQueue></ReviewQueue></ModeratorRoute>
            },
            {
                path: "reported-contents",
                element: <ModeratorRoute><ReportedContents></ReportedContents></ModeratorRoute>
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    },
]);

export default router;