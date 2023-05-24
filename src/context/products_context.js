import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url, products_url as url } from '../utils/constants'
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
  featured_products: []
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
      const { data } = await axios.get(url)
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data }) //data is an array, i will not set it into object

    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
    finally {
      console.log(state);
    }
  }

  useEffect(() => {
    axiosProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => useContext(ProductsContext)
