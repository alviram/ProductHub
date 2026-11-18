/* =====================================
   PRODUCTHUB - PRODUCT MANAGEMENT
===================================== */

// Central product data
let products = [];

// Get all products
export function getProducts() {
    return products;
}

// Set initial products
export function setProducts(data) {
    products = data;
}

// Add a new product
export function addProduct(product) {

    products.push({
        ...product,
        id: Date.now()
    });

}

// Update an existing product
export function updateProduct(updatedProduct) {

    products = products.map(product =>
        product.id === updatedProduct.id
            ? updatedProduct
            : product
    );

}

// Delete a product
export function deleteProduct(productId) {

    products = products.filter(
        product => product.id !== productId
    );

}

// Format prices in Indian Rupees
export function formatCurrency(price) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    }).format(price);

}

// Display products
export function renderProducts(productList) {

    const productGrid = document.getElementById("product-grid");
    const emptyMessage = document.getElementById("empty-message");

    productGrid.replaceChildren();

    if (productList.length === 0) {
        emptyMessage.hidden = false;
        return;
    }

    emptyMessage.hidden = true;

    productList.forEach(product => {

        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.className = "product-image";
        image.src = product.thumbnail;
        image.alt = product.title;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.hidden = true;
        }, { once: true });

        const details = document.createElement("div");
        details.className = "product-details";

        const category = document.createElement("span");
        category.className = "product-category";
        category.textContent = product.category;

        const title = document.createElement("h3");
        title.textContent = product.title;

        const description = document.createElement("p");
        description.className = "product-description";
        description.textContent = product.description;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = formatCurrency(product.price);

        const actions = document.createElement("div");
        actions.className = "product-actions";

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.textContent = "Edit";
        editButton.dataset.action = "edit";
        editButton.dataset.id = product.id;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = product.id;

        const cartButton = document.createElement("button");
        cartButton.className = "add-cart-button";
        cartButton.textContent = "Add to Cart";
        cartButton.dataset.action = "cart";
        cartButton.dataset.id = product.id;

        actions.append(editButton, deleteButton, cartButton);

        details.append(
            category,
            title,
            description,
            price,
            actions
        );

        card.append(image, details);
        productGrid.appendChild(card);

    });

}

// Dashboard statistics
export function updateDashboardStats(productList) {

    document.getElementById("total-products").textContent =
        productList.length;

    const categories = new Set(
        productList.map(product => product.category)
    );

    document.getElementById("total-categories").textContent =
        categories.size;

}


export function getFilteredProducts(productList, searchText, selectedCategory, sortOption) {
    // Create a new array so the original products remain unchanged.
    let filteredProducts = [...productList];

    // 1. Search by product name, description, or category
    if (searchText) {
        const search = searchText.toLowerCase().trim();

        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        );
    }

    // 2. Filter by category
    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }

    // 3. Sort products
    switch (sortOption) {
        case "price-low":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;

        case "price-high":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;

        case "name-asc":
            filteredProducts.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
            break;

        case "name-desc":
            filteredProducts.sort((a, b) =>
                b.title.localeCompare(a.title)
            );
            break;
    }

    return filteredProducts;
}
