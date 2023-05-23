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
      <Route path="/About" element={<AboutPage />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/Products" element={<ProductsPage />} />
      <Route path="/Products/:id" element={<SingleProductPage />} />
      <Route path="/Checkout" element={<CheckoutPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
}

export default App
