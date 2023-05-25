import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
} from "../actions";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) ?? [],
    total_items: 0,
    total_price: 0,
    shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({
            type: ADD_TO_CART,
            payload: { id, color, amount, product },
        });
    };

    const removeItem = (id) => {
        dispatch({ type: REMOVE_CART_ITEM, payload: id });
    };

    const toggleAmount = (id, value) => {
        dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
    };

    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    };

    useEffect(() => {
        dispatch({ type: COUNT_CART_TOTALS }); //kajdiy raz schitayem total dla headera
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <CartContext.Provider
            value={{ ...state, addToCart, removeItem, clearCart, toggleAmount }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
