import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
    if (action.type === ADD_TO_CART) {
        const { id, color, amount, product } = action.payload;
        //check whether we have it in cart
        const existingItem = state.cart.find((x) => x.id === id + color);

        if (existingItem) {
            const tempCart = state.cart.map((x) => {
                if (x.id === id + color) {
                    //cart item id is equal to id+color of those we received
                    let newAmount = x.amount + amount;
                    //check stock in max property of x
                    if (newAmount > x.max) {
                        newAmount = x.max;
                    }

                    return { ...x, amount: newAmount };
                } else {
                    return x;
                }
            });

            return { ...state, cart: tempCart };
        } else {
            const newItem = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.images[0].url,
                price: product.price,
                max: product.stock,
            };
            return { ...state, cart: [...state.cart, newItem] };
        }
    }

    if (action.type === REMOVE_CART_ITEM) {
        const newCart = state.cart.filter((x) => x.id !== action.payload);
        return { ...state, cart: newCart };
    }

    if (action.type === CLEAR_CART) {
        return { ...state, cart: [] };
    }

    if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
        const { id, value } = action.payload;

        const tempCart = state.cart.map((item) => {
            if (item.id === id) {
                if (value === "inc") {
                    let newAmount = item.amount + 1;
                    if (newAmount > item.max) {
                        newAmount = item.max;
                    }
                    return { ...item, amount: newAmount };
                }

                if (value === "dec") {
                    let newAmount = item.amount - 1;
                    if (newAmount < 1) {
                        newAmount = 1;
                    }
                    return { ...item, amount: newAmount };
                }
            } else {
                return item;
            }
        });

        return { ...state, cart: tempCart };
    }

    if (action.type === COUNT_CART_TOTALS) {
        const { total_items, total_price } = state.cart.reduce(
            (total, cartItem) => {
                const { amount, price } = cartItem;
                total.total_items += amount;
                total.total_price += price * amount;

                return total
            },
            {
                total_items: 0,
                total_price: 0,
            }
        );

        return { ...state, total_items, total_price };
    }

    throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
