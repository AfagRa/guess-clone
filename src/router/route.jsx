import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router";
import HomePage from "../pages/User/HomePage";
import BasketPage from "../pages/User/BasketPage";
import WishlistPage from "../pages/User/WishlistPage";
import GeneralLayout from "../layout/GeneralLayout";
import SalePage from "../pages/User/SalePage";
import DetailsPage from "../pages/User/DetailsPage";
import ProductsPage from "../pages/User/ProductsPage";

export const route = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<GeneralLayout />}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<HomePage />} />
                <Route path=":main/*" element={<ProductsPage />} />
                <Route path="product/:id" element={<DetailsPage />} />
                <Route path="basket" element={<BasketPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="sale" element={<SalePage />} />
            </Route>
        </>
    )
)