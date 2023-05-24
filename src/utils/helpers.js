export const formatPrice = (price) => {
    return Intl.NumberFormat('en-Us', { style: 'currency', currency: "USD" }).format(price / 100)
}

export const getUniqueValues = () => { }
