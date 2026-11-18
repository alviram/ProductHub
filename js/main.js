
/* =====================================
   PRODUCTHUB - MAIN APPLICATION
===================================== */

import { fetchProducts } from "./api.js";

import {
    saveProducts,
    loadProducts,
    saveCart,
    loadCart
} from "./storage.js";

import {
    getProducts,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    renderProducts,
    updateDashboardStats,
    getFilteredProducts,
    formatCurrency
} from "./products.js";

import {
    addToCart,
    getCartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartCount,
    getCartTotal,
    loadCartItems
} from "./cart.js";

import { debounce, throttle } from "./utils.js";


// =====================================
// HTML ELEMENTS
// =====================================

// Product modal elements
const productModal = document.getElementById("product-modal");
const productForm = document.getElementById("product-form");

const addProductBtn = document.getElementById("add-product-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cancelModalBtn = document.getElementById("cancel-modal-btn");

const modalTitle = document.getElementById("modal-title");

const productIdInput = document.getElementById("product-id");
const productTitleInput = document.getElementById("product-title");
const productPriceInput = document.getElementById("product-price");
const productCategoryInput = document.getElementById("product-category");
const productDescriptionInput = document.getElementById("product-description");
const productImageInput = document.getElementById("product-image");

// Search, filter and sorting elements
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort-select");

// Image preview elements
const imagePreview = document.getElementById("image-preview");
const imagePreviewContainer = document.getElementById("image-preview-container");

// Shopping cart elements
const cartItemsContainer = document.getElementById("cart-items");
const cartCountElement = document.getElementById("cart-count");

const totalCartItemsElement = document.getElementById("total-cart-items");
const cartTotalElement = document.getElementById("cart-total");

const summaryQuantityElement = document.getElementById("summary-quantity");
const summarySubtotalElement = document.getElementById("summary-subtotal");
const summaryTotalElement = document.getElementById("summary-total");

const openCartBtn = document.getElementById("open-cart-btn");

// Store selected image
let selectedImage = "";


// =====================================
// UPDATE CATEGORY DROPDOWN
// =====================================

function updateCategoryOptions() {

    const products = getProducts();

    const currentCategory = categoryFilter.value;

    const categories = [
        ...new Set(products.map(product => product.category))
    ];

    categoryFilter.replaceChildren();

    const allOption = document.createElement("option");

    allOption.value = "all";
    allOption.textContent = "All Categories";

    categoryFilter.appendChild(allOption);

    categories.sort().forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);

    });

    if (categories.includes(currentCategory)) {

        categoryFilter.value = currentCategory;

    } else {

        categoryFilter.value = "all";

    }

}


// =====================================
// REFRESH PRODUCT DASHBOARD
// =====================================

function refreshDashboard() {

    const products = getProducts();

    updateCategoryOptions();

    const searchText = searchInput.value;
    const selectedCategory = categoryFilter.value;
    const sortOption = sortSelect.value;

    const displayedProducts = getFilteredProducts(
        products,
        searchText,
        selectedCategory,
        sortOption
    );

    // Render matching products
    renderProducts(displayedProducts);

    // Update statistics using all products
    updateDashboardStats(products);

    // Save complete product list
    const saved = saveProducts(products);

    if (!saved) {

        console.error("Unable to save products.");

        alert("Unable to save products. Check your browser storage.");

    }

    // Also refresh shopping cart
    refreshCart();

}


// =====================================
// RENDER SHOPPING CART
// =====================================

function renderCart() {

    const cartItems = getCartItems();

    cartItemsContainer.replaceChildren();

    // Empty cart message
    if (cartItems.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent = "Your shopping cart is empty.";

        emptyMessage.className = "empty-cart-message";

        cartItemsContainer.appendChild(emptyMessage);

    }

    // Display each cart product
    cartItems.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        // Product details
        const details = document.createElement("div");

        details.className = "cart-item-details";

        const title = document.createElement("h4");

        title.textContent = item.title;

        const price = document.createElement("p");

        price.textContent = formatCurrency(item.price);

        details.append(title, price);

        // Quantity controls
        const controls = document.createElement("div");

        controls.className = "cart-item-controls";

        const decreaseButton = document.createElement("button");

        decreaseButton.type = "button";
        decreaseButton.textContent = "−";
        decreaseButton.dataset.action = "decrease";
        decreaseButton.dataset.id = item.id;

        const quantity = document.createElement("span");

        quantity.textContent = item.quantity;

        const increaseButton = document.createElement("button");

        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.dataset.action = "increase";
        increaseButton.dataset.id = item.id;

        controls.append(
            decreaseButton,
            quantity,
            increaseButton
        );

        // Remove button
        const removeButton = document.createElement("button");

        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.dataset.action = "remove";
        removeButton.dataset.id = item.id;

        // Product subtotal
        const subtotal = document.createElement("p");

        subtotal.className = "cart-item-subtotal";

        subtotal.textContent = formatCurrency(
            item.price * item.quantity
        );

        cartItem.append(
            details,
            controls,
            subtotal,
            removeButton
        );

        cartItemsContainer.appendChild(cartItem);

    });

}


// =====================================
// UPDATE CART DASHBOARD
// =====================================

function updateCartUI() {

    const totalQuantity = getCartCount();

    const totalPrice = getCartTotal();

    // Header cart count
    cartCountElement.textContent = totalQuantity;

    // Dashboard statistics
    totalCartItemsElement.textContent = totalQuantity;

    cartTotalElement.textContent = formatCurrency(totalPrice);

    // Cart summary
    summaryQuantityElement.textContent = totalQuantity;

    summarySubtotalElement.textContent = formatCurrency(totalPrice);

    summaryTotalElement.textContent = formatCurrency(totalPrice);

    // Save cart to LocalStorage
    const saved = saveCart(getCartItems());

    if (!saved) {

        console.error("Unable to save shopping cart.");

    }

}


// =====================================
// REFRESH CART
// =====================================

function refreshCart() {

    renderCart();

    updateCartUI();

}


// =====================================
// RESET IMAGE PREVIEW
// =====================================

function resetImagePreview() {

    selectedImage = "";

    imagePreview.src = "";

    imagePreviewContainer.hidden = true;

    productImageInput.value = "";

}


// =====================================
// OPEN ADD PRODUCT MODAL
// =====================================

function openAddModal() {

    productForm.reset();

    productIdInput.value = "";

    resetImagePreview();

    modalTitle.textContent = "Add New Product";

    productModal.hidden = false;

}


// =====================================
// OPEN EDIT PRODUCT MODAL
// =====================================

function openEditModal(productId) {

    const product = getProducts().find(
        item => item.id === productId
    );

    if (!product) return;

    productIdInput.value = product.id;

    productTitleInput.value = product.title;

    productPriceInput.value = product.price;

    productCategoryInput.value = product.category;

    productDescriptionInput.value = product.description;

    selectedImage = product.thumbnail;

    imagePreview.src = product.thumbnail;

    imagePreviewContainer.hidden = false;

    productImageInput.value = "";

    modalTitle.textContent = "Edit Product";

    productModal.hidden = false;

}


// =====================================
// CLOSE PRODUCT MODAL
// =====================================

function closeModal() {

    productModal.hidden = true;

    productForm.reset();

    resetImagePreview();

}


// =====================================
// PRODUCT IMAGE UPLOAD
// =====================================

productImageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {

        alert("Please select a JPG, PNG or WEBP image.");

        this.value = "";

        return;

    }

    if (file.size > 2 * 1024 * 1024) {

        alert("Image size must be less than 2 MB.");

        this.value = "";

        return;

    }

    const reader = new FileReader();

    reader.onload = function (event) {

        selectedImage = event.target.result;

        imagePreview.src = selectedImage;

        imagePreviewContainer.hidden = false;

    };

    reader.onerror = function () {

        alert("Unable to read the selected image.");

    };

    reader.readAsDataURL(file);

});


// =====================================
// SAVE PRODUCT FORM
// =====================================

productForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const productId = productIdInput.value;

    const product = {

        title: productTitleInput.value.trim(),

        price: Number(productPriceInput.value),

        category: productCategoryInput.value.trim(),

        description: productDescriptionInput.value.trim(),

        thumbnail: selectedImage ||
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"

    };

    // Validate product information
    if (
        !product.title ||
        !product.category ||
        !product.description ||
        !Number.isFinite(product.price) ||
        product.price <= 0
    ) {

        alert("Please enter valid product details.");

        return;

    }

    // Update existing product
    if (productId) {

        product.id = Number(productId);

        updateProduct(product);

        alert("Product updated successfully!");

    }

    // Add new product
    else {

        addProduct(product);

        alert("Product added successfully!");

    }

    closeModal();

    refreshDashboard();

});


// =====================================
// ADD PRODUCT BUTTON
// =====================================

addProductBtn.addEventListener("click", openAddModal);


// =====================================
// CLOSE AND CANCEL BUTTONS
// =====================================

closeModalBtn.addEventListener("click", closeModal);

cancelModalBtn.addEventListener("click", closeModal);


// =====================================
// SEARCH - DEBOUNCING
// =====================================

const handleSearch = debounce(function () {

    refreshDashboard();

}, 300);

searchInput.addEventListener("input", handleSearch);


// =====================================
// CATEGORY FILTER
// =====================================

categoryFilter.addEventListener("change", function () {

    refreshDashboard();

});


// =====================================
// PRODUCT SORTING
// =====================================

sortSelect.addEventListener("change", function () {

    refreshDashboard();

});


// =====================================
// PRODUCT GRID EVENT DELEGATION
// =====================================

document.getElementById("product-grid").addEventListener(
    "click",
    function (event) {

        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const productId = Number(button.dataset.id);

        const action = button.dataset.action;

        // EDIT PRODUCT
        if (action === "edit") {

            openEditModal(productId);

        }

        // DELETE PRODUCT
        else if (action === "delete") {

            const confirmed = confirm(
                "Are you sure you want to delete this product?"
            );

            if (!confirmed) return;

            deleteProduct(productId);

            // Also remove deleted product from cart
            removeFromCart(productId);

            refreshDashboard();

        }

        // ADD PRODUCT TO CART
        else if (action === "cart") {

            const product = getProducts().find(
                item => item.id === productId
            );

            if (!product) return;

            addToCart(product);

            refreshCart();

        }

    }

);


// =====================================
// CART EVENT DELEGATION
// =====================================

cartItemsContainer.addEventListener(
    "click",
    function (event) {

        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const productId = Number(button.dataset.id);

        const action = button.dataset.action;

        // INCREASE QUANTITY
        if (action === "increase") {

            increaseQuantity(productId);

        }

        // DECREASE QUANTITY
        else if (action === "decrease") {

            decreaseQuantity(productId);

        }

        // REMOVE PRODUCT
        else if (action === "remove") {

            removeFromCart(productId);

        }

        // Refresh cart after every action
        refreshCart();

    }

);


// =====================================
// OPEN CART BUTTON
// =====================================

openCartBtn.addEventListener("click", function () {

    document.getElementById("cart-section").scrollIntoView({
        behavior: "smooth"
    });

});


const handleScroll = throttle((event) => {
    const header = document.querySelector(".top-header");

    if (!header) return;

    const scrollPosition =
        event.target === document
            ? window.scrollY
            : event.target.scrollTop;

    header.classList.toggle("is-scrolled", scrollPosition > 10);
}, 150);

document.addEventListener("scroll", handleScroll, true);

window.addEventListener("scroll", handleScroll);
// =====================================
// INITIALIZE APPLICATION
// =====================================

async function initializeApp() {

    const loadingMessage =
        document.getElementById("loading-message");

    const errorMessage =
        document.getElementById("error-message");

    try {

        loadingMessage.hidden = false;

        errorMessage.hidden = true;

        // LOAD PRODUCTS
        const savedProducts = loadProducts();

        if (savedProducts !== null) {

            setProducts(savedProducts);

            console.log("Products loaded from LocalStorage!");

        } else {

            const products = await fetchProducts();

            setProducts(products);

            console.log("Products loaded from initial data!");

        }

        // LOAD SHOPPING CART
        const savedCart = loadCart();

        loadCartItems(savedCart);

        console.log("Shopping cart loaded from LocalStorage!");

        // Refresh dashboard and cart
        refreshDashboard();

        loadingMessage.hidden = true;

        console.log(
            "Total Products:",
            getProducts().length
        );

        console.log(
            "Total Cart Items:",
            getCartCount()
        );

    } catch (error) {

        loadingMessage.hidden = true;

        errorMessage.textContent =
            error.message || "Something went wrong.";

        errorMessage.hidden = false;

        console.error("Application Error:", error);

    }

}


// =====================================
// START APPLICATION
// =====================================

initializeApp();
