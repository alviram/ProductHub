# ProductHub -- Cosmetic Product Management Application

ProductHub is a browser-based product management application built with
**HTML, CSS, and vanilla JavaScript (ES6+)**. It uses a cosmetic and
beauty-products theme and demonstrates product CRUD operations, product
discovery, a shopping cart, browser storage, and modern JavaScript
concepts.

## Features

### Product management

-   View products loaded from a REST API.
-   Add new products.
-   Edit existing products.
-   Delete products.
-   Upload product images.
-   Search products by title, description, or category.
-   Filter products by category.
-   Sort products by price or product name.

### Shopping cart

-   Add products to the cart.
-   Increase or decrease item quantities.
-   Remove products from the cart.
-   Calculate item subtotals, total quantity, and cart total.
-   Persist cart data using LocalStorage.

### Data persistence

-   Save product data in LocalStorage.
-   Save shopping-cart data in LocalStorage.
-   Restore saved data when the application is reopened.

### Error handling

-   Check REST API responses.
-   Handle failed API requests with fallback product data.
-   Handle invalid or unavailable saved data.
-   Validate product and cart data before using it.

## Technologies Used

-   HTML5
-   CSS3
-   JavaScript (ES6+)
-   Fetch API
-   REST API
-   LocalStorage
-   Browser Developer Tools

No React, Angular, jQuery, or external JavaScript framework is used.

## Project Structure

``` text
ProductHub/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── style.css
└── js/
    ├── main.js
    ├── api.js
    ├── products.js
    ├── cart.js
    ├── storage.js
    └── utils.js
```

## Getting Started

### Requirements

-   A modern web browser (Google Chrome, Microsoft Edge, Firefox, etc.).
-   Visual Studio Code is recommended.
-   The VS Code Live Server extension is recommended.
-   An internet connection is required to load products from the REST
    API. The application also contains fallback product data for API
    failures.

### Run the application

1.  Download or clone this repository.
2.  Open the `ProductHub` folder in Visual Studio Code.
3.  Start `index.html` using the Live Server extension.
4.  The application will open in your browser.
5.  On initial load, the app can request products from the configured
    REST API. Product and cart data are then persisted in LocalStorage.

> **Important:** Open the project through Live Server or another local
> HTTP server. Do not rely on opening `index.html` directly with a
> `file://` URL, because the project uses JavaScript modules.

## REST API Integration

The application uses the Fetch API with `async/await` to request product
data from DummyJSON:

``` text
https://dummyjson.com/products/category/beauty?limit=6
```

The API response is checked before its product data is mapped into the
application's product structure. If the request fails, the application
falls back to the local cosmetic product data defined in `api.js`.

The application may load previously saved products from LocalStorage
instead of making a new API request on every page load. To test the
initial API-loading path again, clear the `producthub_products` key from
LocalStorage and refresh the page.

## JavaScript Concepts Demonstrated

  -----------------------------------------------------------------------
  Concept                 Where it is used        Purpose
  ----------------------- ----------------------- -----------------------
  ES modules              JavaScript files using  Organizes the
                          `import` and `export`   application into
                                                  separate modules

  Promises                `api.js` and            Handles work that
                          asynchronous Fetch      completes
                          operations              asynchronously

  `async/await`           `api.js`                Makes asynchronous API
                                                  code easier to read

  Fetch API               `api.js`                Sends an HTTP request
                                                  to the REST API

  Closure                 `utils.js`              Keeps private
                                                  timer/state variables
                                                  between function calls

  Debouncing              `utils.js`, used for    Waits until typing
                          product search          pauses before running
                                                  the search callback

  Throttling              `utils.js`, used for    Limits how frequently a
                          scroll handling         callback can run

  Map                     `cart.js`               Stores cart items by
                                                  product ID

  Set                     `products.js`           Gets unique product
                                                  categories

  Event delegation        `main.js`               Handles actions from
                                                  product and cart
                                                  elements through parent
                                                  listeners

  LocalStorage            `storage.js`            Persists product and
                                                  cart data in the
                                                  browser

  Array methods           `products.js`,          Uses methods such as
                          `cart.js`, `main.js`    `map`, `filter`,
                                                  `forEach`, and `sort`

  DOM manipulation        `products.js`,          Creates and updates
                          `main.js`               interface elements

  Error handling          `api.js`, `storage.js`, Handles failed requests
                          `main.js`               and invalid data
  -----------------------------------------------------------------------

## LocalStorage Keys

The application uses these browser storage keys:

-   `producthub_products` -- saved product list.
-   `producthub_cart` -- saved shopping-cart items.

Data is stored in JSON format. Clearing browser site data or removing
these keys resets the corresponding saved application data.

## Testing Checklist

-   [ ] Products load when the application starts.
-   [ ] Add a product and confirm it appears in the product list.
-   [ ] Edit a product and confirm the changes are displayed.
-   [ ] Delete a product and confirm it is removed.
-   [ ] Search by product name or description.
-   [ ] Filter by category.
-   [ ] Test each sorting option.
-   [ ] Add products to the cart.
-   [ ] Increase and decrease cart quantities.
-   [ ] Remove a cart item.
-   [ ] Refresh the page and verify product and cart data persist.
-   [ ] Test the API failure fallback by temporarily using an invalid
    API URL, then restore the correct URL.
-   [ ] Test the layout at desktop and mobile screen sizes.

## Known Notes

-   DummyJSON is a sample-data API. Its product prices and product
    information are demonstration data, not verified retail listings.
-   Product and cart changes are stored in the current browser's
    LocalStorage; they are not written back to DummyJSON.
-   Clearing LocalStorage removes the saved browser data.
-   The API request may not run on every refresh when saved product data
    is already available.

## Future Improvements

-   Add automated tests for product and cart operations.
-   Add stronger form validation and user-facing error messages.
-   Add product pagination and category management.
-   Add a backend database and authentication if persistent multi-user
    data is required.

## Author

**Project:** ProductHub -- Cosmetic Product Management Application\
**Built with:** HTML, CSS, and Vanilla JavaScript (ES6+)
