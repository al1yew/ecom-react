import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
    const { filtered_products: products, grid_view } = useFilterContext();
    //eto mena razdrajayet, nado error dobavit v initial state
    if (products.length < 1) {
        return (
            <h5 style={{ textTransform: "none" }}>
                sorry, no products matched your search
            </h5>
        );
    }

    if (grid_view) {
        return <GridView products={products}>list</GridView>;
    } else {
        return <ListView products={products}>list</ListView>;
    }
};

export default ProductList;
