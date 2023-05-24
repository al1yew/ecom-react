import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import {
  HomePage,
  ProductsPage,
  SingleProductPage,
  AboutPage,
  CartPage,
  ErrorPage,
  CheckoutPage,
  PrivateRoute
} from './pages'

function App() {
  return <BrowserRouter>
    <Navbar />
    <Sidebar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<SingleProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
}

export default App
