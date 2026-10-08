const products = [

    {
        id: 1,
        name: "Classic Oversized Shirt",
        category: "Men",
        price: 1499,
        oldPrice: 1999,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        name: "Premium Black Jacket",
        category: "Men",
        price: 2499,
        oldPrice: 3299,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        name: "Elegant Summer Dress",
        category: "Women",
        price: 1899,
        oldPrice: 2499,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Classic White Dress",
        category: "Women",
        price: 2199,
        oldPrice: 2999,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        name: "Minimal Watch",
        category: "Accessories",
        price: 1599,
        oldPrice: 2199,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Leather Handbag",
        category: "Accessories",
        price: 1999,
        oldPrice: 2699,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        name: "Urban Hoodie",
        category: "Men",
        price: 1299,
        oldPrice: 1799,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "Fashion Sunglasses",
        category: "Accessories",
        price: 999,
        oldPrice: 1499,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
    }

];


let cart = [];

let wishlist = [];


/* DISPLAY PRODUCTS */

function displayProducts(list = products) {

    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    if (list.length === 0) {

        grid.innerHTML = `
            <h2 style="grid-column:1/-1;text-align:center;">
                No products found.
            </h2>
        `;

        return;
    }


    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product";

        card.innerHTML = `

            <button
                class="wishlist"
                onclick="addWishlist(${product.id})">
                ♡
            </button>

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <div class="category-name">
                    ${product.category}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <div class="price">

                    ₹${product.price.toLocaleString()}

                    <span class="old-price">
                        ₹${product.oldPrice.toLocaleString()}
                    </span>

                </div>

                <div class="product-buttons">

                    <button
                        onclick="addToCart(${product.id})">
                        ADD TO CART
                    </button>

                    <button
                        onclick="buyNow(${product.id})">
                        BUY NOW
                    </button>

                </div>

            </div>
        `;

        grid.appendChild(card);

    });

}


/* FILTER */

function filterCategory(category) {

    if (category === "All") {

        displayProducts(products);

    } else {

        const filtered = products.filter(
            product => product.category === category
        );

        displayProducts(filtered);

    }

    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* SEARCH */

function openSearch() {

    const box = document.getElementById("searchBox");

    box.style.display =
        box.style.display === "block"
        ? "none"
        : "block";

}


function searchProducts() {

    const query =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const results = products.filter(product =>

        product.name
            .toLowerCase()
            .includes(query)

        ||

        product.category
            .toLowerCase()
            .includes(query)

    );

    displayProducts(results);

}


/* CART */

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    cart.push(product);

    updateCart();

    alert(product.name + " added to cart!");

}


function updateCart() {

    document.getElementById("cartCount")
        .textContent = cart.length;


    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        ₹${product.price.toLocaleString()}
                    </p>

                    <button
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    document.getElementById("cartTotal")
        .textContent =
        "₹" + total.toLocaleString();

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


function openCart() {

    document.getElementById("cartOverlay")
        .style.display = "block";

}


function closeCart() {

    document.getElementById("cartOverlay")
        .style.display = "none";

}


/* WISHLIST */

function addWishlist(id) {

    if (!wishlist.includes(id)) {

        wishlist.push(id);

        document.getElementById("wishlistCount")
            .textContent = wishlist.length;

        alert("Added to wishlist ❤️");

    } else {

        alert("Already in wishlist");

    }

}


function showWishlist() {

    if (wishlist.length === 0) {

        alert("Your wishlist is empty.");

        return;

    }

    const items = wishlist.map(id => {

        const product =
            products.find(p => p.id === id);

        return product.name;

    });

    alert(
        "Wishlist:\n\n" +
        items.join("\n")
    );

}


/* BUY NOW */

function buyNow(id) {

    const product =
        products.find(p => p.id === id);

    cart.push(product);

    updateCart();

    openCart();

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    alert(
        "Checkout page coming next! 🛍️"
    );

}


/* NEWSLETTER */

function subscribe() {

    const email =
        document.getElementById("email").value;

    if (!email) {

        alert("Please enter your email.");

        return;

    }

    alert(
        "Thanks for subscribing! 🎉"
    );

}


/* PROMO */

function showMessage() {

    document.getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* INITIAL LOAD */

displayProducts();