
/* =====================================
   PRODUCTHUB - LOCAL STORAGE
===================================== */

const STORAGE_KEY = "producthub_products";


// Save products in browser LocalStorage
export function saveProducts(products) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(products)
        );

        console.log("Products saved successfully!");

        return true;

    } catch (error) {

        console.error("LocalStorage Error:", error);

        return false;

    }

}


// Retrieve saved products
export function loadProducts() {

    try {

        const savedData = localStorage.getItem(STORAGE_KEY);

        // No saved data available
        if (savedData === null) {
            return null;
        }

        const products = JSON.parse(savedData);

        // Validate retrieved data
        if (!Array.isArray(products)) {
            throw new Error("Invalid saved product data.");
        }

        return products;

    } catch (error) {

        console.error("Unable to load saved products:", error);

        return null;

    }

}


// Remove saved products if needed
export function clearProducts() {

    localStorage.removeItem(STORAGE_KEY);

}


/* =====================================
   SHOPPING CART STORAGE
===================================== */

const CART_STORAGE_KEY = "producthub_cart";

// Save cart items
export function saveCart(cartItems) {

    try {

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cartItems)
        );

        return true;

    } catch (error) {

        console.error("Cart Storage Error:", error);

        return false;

    }

}


// Load cart items
export function loadCart() {

    try {

        const savedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (savedCart === null) return [];

        const cartItems = JSON.parse(savedCart);

        if (!Array.isArray(cartItems)) {

            throw new Error("Invalid cart data.");

        }

        return cartItems;

    } catch (error) {

        console.error("Cart Loading Error:", error);

        return [];

    }

}
