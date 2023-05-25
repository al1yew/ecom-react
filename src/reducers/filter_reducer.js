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
        let maxPrice = action.payload.map((p) => p.price);
        maxPrice = Math.max(...maxPrice);

        return {
            ...state,
            filtered_products: [...action.payload],
            all_products: [...action.payload],
            isLoading: false,
            filters: {
                ...state.filters,
                max_price: maxPrice,
                price: maxPrice,
            },
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

        //oba varianta pokazivayu kak delat Array.sort

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

    if (action.type === UPDATE_FILTERS) {
        const { name, value } = action.payload;

        return {
            ...state,
            filters: { ...state.filters, [name]: value },
        };
    }

    if (action.type === FILTER_PRODUCTS) {
        const { all_products } = state;

        let tempProducts = [...all_products];

        const { text, category, company, color, price, shipping } =
            state.filters;

        if (text) {
            tempProducts = tempProducts.filter((x) =>
                x.name.toLowerCase().includes(text)
            );
        }

        if (category !== "all") {
            tempProducts = tempProducts.filter((x) => x.category === category);
        }

        if (company !== "all") {
            tempProducts = tempProducts.filter((x) => x.company === company);
        }

        if (color !== "all") {
            tempProducts = tempProducts.filter((x) => {
                return x.colors.find((c) => c === color);
            });
        }

        tempProducts = tempProducts.filter((x) => x.price <= price);

        if (shipping) {
            tempProducts = tempProducts.filter((x) => x.shipping);
        }

        return {
            ...state,
            filtered_products: tempProducts,
        };
    }

    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            filters: {
                ...state.filters,
                text: "",
                company: "all",
                category: "all",
                color: "all",
                price: state.filters.max_price,
                shipping: false,
            },
        };
    }

    throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
