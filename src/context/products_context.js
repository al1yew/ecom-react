import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { single_product_url, products_url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products: [],
  products_loading: false,
  products_error: false,
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const axiosProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN })

    try {
      const { data } = await axios.get(products_url)
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data }) //data is an array, i will not set it into object

    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  useEffect(() => {
    axiosProducts()
  }, [])

  const axiosSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })

    try {
      const { data } = await axios.get(single_product_url + id)
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data })

    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar, axiosSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => useContext(ProductsContext)
