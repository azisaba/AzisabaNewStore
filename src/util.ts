export const API_ROOT = "https://api-ktor.azisaba.net"

export const addToCart = (product: Product | SaraProduct) => {
    if (!product) {
        throw new Error("No product provided")
    }
    // use local storage
    const cart = localStorage.getItem("cart")
    if (cart) {
        const cartArray = JSON.parse(cart)
        cartArray.push(product)
        localStorage.setItem("cart", JSON.stringify(cartArray))
    } else {
        localStorage.setItem("cart", JSON.stringify([product]))
    }
}

export const getCart = (): Array<Product | SaraProduct> => {
    const cart = localStorage.getItem("cart")
    if (cart) {
        return JSON.parse(cart)
    } else {
        return []
    }
}
