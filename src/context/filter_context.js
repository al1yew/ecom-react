import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    list_view: false,
    isLoading: true,
    isError: false,
    sort: "price-lowest",
    filters: {
        text: "",
        company: "all",
        category: "all",
        color: "all",
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false,
    },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { products } = useProductsContext();
    //products context okutivayet ves proekt, toest pri zagruzke sayta srazu prinosim produkti.
    //Oni u mena i v single page, i v homepage, i v products page est
    //znacit pri zagruzke vseqo applicationa ya peredayu svoi produkti v filter context toje.
    //ved vdruq user birbasha produktlar sehifesine girdi.
    //i poetomu v pervom useeffekte ya prinoshu produkti iz produkt contexta
    //vo vtorom useeffekte srazu sortiruyu i filtruyu ix.
    //koneshno filtrov net, no sort est - price-lowest, i mojno dobavit eshe show 10 20 30
    //znacit productlar gelen kimi nado aktivirovat useeffect, ved vdruq moy useeffect vizovetsa ranshe,
    //chem produkti zaseli v produkt contexte. poetomu v dependencies est products
    //vtoroy useeffect vizivayetsa kak mi uje skazali koqda produkti set olunur, initial sort olunur price lowest ile
    //i tak je koqda na sayte sleva user filtruyet produkti. poetomu v dependencies vse eto est.

    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products });
    }, [products]);

    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS });
        dispatch({ type: SORT_PRODUCTS });
    }, [products, state.sort, state.filters]);
    //tema v tom, shto mi snachala zagrujayem produkti v pervom use effecte, i srazu je zovem i vtoroy
    //u nas ved est v initial state sort kotoriy price-lowest, nam nado kak nikak otsortirovat, ved
    //v select optione stoit etot price-lowest pervim. naprimer, esli bi tam bilo show: 10, 20, 30 itd,
    // eto toje bi ispolzovali. blagodara useeffectu mojno vse zaranee sdelat i vse

    //#region functions

    const setGridView = () => dispatch({ type: SET_GRIDVIEW });

    const setListView = () => dispatch({ type: SET_LISTVIEW });

    const updateSort = (e) =>
        dispatch({ type: UPDATE_SORT, payload: e.target.value });

    //da, vmesto 3 funkciy mojno prosto otpravit tuda dispatch,
    //no vse taki esli nese olsa, nujno budet begat po raznim
    //componentam. A tak, vse naxoditsa tut, v odnom kontekste

    const updateFilters = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "category") {
            //legce sdelat input radio knsh je
            value = e.target.textContent;
        }

        if (name === "color") {
            value = e.target.dataset.color;
        }

        if (name === "price") {
            value = Number(value);
        }

        if (name === "shipping") {
            value = e.target.checked;
        }

        dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    };

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    };

    //#endregion functions

    return (
        <FilterContext.Provider
            value={{
                ...state,
                updateSort,
                setGridView,
                setListView,
                updateFilters,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => useContext(FilterContext);
