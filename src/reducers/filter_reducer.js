import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
    if (action.type === LOAD_PRODUCTS) {
        return {
            ...state,
            filtered_products: [...action.payload],
            all_products: [...action.payload],
            isLoading: false,
            //we spread the array because an array takes
            //one address in our memory, so if i do not
            //spread it, filtering functionality will be lost.
            //Now we just copy the values by spreading
        };
    }

    if (action.type === SET_LISTVIEW) {
        return {
            ...state,
            list_view: true,
            grid_view: false,
            isLoading: false,
        };
    }

    if (action.type === SET_GRIDVIEW) {
        return {
            ...state,
            list_view: false,
            grid_view: true,
            isLoading: false,
        };
    }

    if (action.type === UPDATE_SORT) {
        return {
            ...state,
            sort: action.payload,
            isLoading: false,
        };
    }

    if (action.type === SORT_PRODUCTS) {
        const { sort, filtered_products } = state;

        let tempProds = [...filtered_products];

        if (sort === "price-lowest") {
            tempProds = tempProds.sort((a, b) => a.price - b.price);
        }

        if (sort === "price-highest") {
            tempProds = tempProds.sort((a, b) => {
                if (a.price > b.price) {
                    return -1;
                }

                if (a.price < b.price) {
                    return 1;
                }
                
                return 0;
            });
        }

        if (sort === "name-a") {
            tempProds = tempProds.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }

        if (sort === "name-z") {
            tempProds = tempProds.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        }

        return {
            ...state,
            filtered_products: tempProds,
            isLoading: false,
        };
    }

    throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
