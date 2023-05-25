import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
    HomePage,
    ProductsPage,
    SingleProductPage,
    AboutPage,
    CartPage,
    ErrorPage,
    CheckoutPage,
    PrivateRoute,
    AuthWrapper,
} from "./pages";

function App() {
    return (
        <AuthWrapper>
            <BrowserRouter>
                <Navbar />
                <Sidebar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route
                        path="/products/:id"
                        element={<SingleProductPage />}
                    />

                    <Route
                        path="/checkout"
                        element={
                            <PrivateRoute>
                                <CheckoutPage />
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthWrapper>
    );
}

export default App;
