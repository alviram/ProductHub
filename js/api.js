/* =====================================
   PRODUCTHUB - COSMETIC PRODUCT API
===================================== */

const cosmeticProducts = [
    {
        id: 1,
        title: "Vitamin C Face Serum",
        price: 599,
        category: "Skincare",
        description: "Brightening serum for healthy, glowing skin.",
        thumbnail: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600"
    },
    {
        id: 2,
        title: "Hydrating Moisturizer",
        price: 449,
        category: "Skincare",
        description: "Deep hydration for soft and smooth skin.",
        thumbnail: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"
    },
    {
        id: 3,
        title: "SPF 50 Sunscreen",
        price: 399,
        category: "Skincare",
        description: "Daily sun protection with lightweight coverage.",
        thumbnail: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600"
    },
    {
        id: 4,
        title: "Matte Lipstick",
        price: 299,
        category: "Makeup",
        description: "Long-lasting matte colour for beautiful lips.",
        thumbnail: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600"
    },
    {
        id: 5,
        title: "Liquid Foundation",
        price: 699,
        category: "Makeup",
        description: "Smooth foundation for an even-looking complexion.",
        thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
    },
    {
        id: 6,
        title: "Nourishing Shampoo",
        price: 349,
        category: "Haircare",
        description: "Gentle cleansing for soft and manageable hair.",
        thumbnail: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"
    }
];



const API_URL = "https://dummyjson.com/products/category/beauty?limit=6";

export async function fetchProducts() {
    try {
        console.log("Fetching products from REST API...");

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.products)) {
            throw new Error("Invalid API response.");
        }

        const products = data.products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            description: product.description,
            thumbnail: product.thumbnail
        }));

        console.log("Products successfully fetched from API!");

        return products;

    } catch (error) {
        console.error("REST API Error:", error);
        console.log("Loading fallback cosmetic products...");

        return cosmeticProducts;
    }
}
