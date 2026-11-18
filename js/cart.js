
/* =====================================
   PRODUCTHUB - SHOPPING CART
===================================== */

// Map stores products using their unique IDs
const cart = new Map();


// =====================================
// ADD PRODUCT TO CART
// =====================================

export function addToCart(product) {

    const productId = product.id;

    if (cart.has(productId)) {

        // Increase quantity if product already exists
        const cartItem = cart.get(productId);

        cartItem.quantity++;

    } else {

        // Add new product with quantity 1
        cart.set(productId, {
            ...product,
            quantity: 1
        });

    }

}


// =====================================
// GET CART ITEMS
// =====================================

export function getCartItems() {

    return [...cart.values()];

}


// =====================================
// INCREASE QUANTITY
// =====================================

export function increaseQuantity(productId) {

    if (!cart.has(productId)) return;

    cart.get(productId).quantity++;

}


// =====================================
// DECREASE QUANTITY
// =====================================

export function decreaseQuantity(productId) {

    if (!cart.has(productId)) return;

    const item = cart.get(productId);

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart.delete(productId);

    }

}


// =====================================
// REMOVE PRODUCT FROM CART
// =====================================

export function removeFromCart(productId) {

    cart.delete(productId);

}


// =====================================
// CLEAR CART
// =====================================

export function clearCart() {

    cart.clear();

}


// =====================================
// CART QUANTITY
// =====================================

export function getCartCount() {

    let totalQuantity = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;

    });

    return totalQuantity;

}


// =====================================
// CART TOTAL
// =====================================

export function getCartTotal() {

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    return total;

}


// =====================================
// LOAD CART DATA
// =====================================

export function loadCartItems(items) {

    cart.clear();

    if (!Array.isArray(items)) return;

    items.forEach(item => {

        if (
            item &&
            Number.isFinite(Number(item.id)) &&
            Number.isFinite(Number(item.price)) &&
            Number.isFinite(Number(item.quantity)) &&
            Number(item.quantity) > 0
        ) {

            cart.set(Number(item.id), {
                ...item,
                id: Number(item.id),
                price: Number(item.price),
                quantity: Number(item.quantity)
            });

        }

    });

}
