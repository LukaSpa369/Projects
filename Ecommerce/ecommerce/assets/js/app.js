document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99, image: "assets/img/water.jpg" },
        { id: 2, name: "Product 2", price: 39.99, image: "assets/img/park.webp" },
        { id: 3, name: "Product 3", price: 19.99, image: "assets/img/uvc.png" },
        { id: 4, name: "Product 4", price: 49.99, image: "assets/img/bottle.jpg" },
        { id: 5, name: "Product 5", price: 59.99, image: "assets/img/bot.webp" },
        { id: 6, name: "Product 6", price: 24.99, image: "assets/img/rock.webp" },
        { id: 7, name: "Product 7", price: 34.99, image: "assets/img/kiyo.webp" },
        { id: 8, name: "Product 8", price: 44.99, image: "assets/img/poll.webp" },
        { id: 9, name: "Product 9", price: 54.99, image: "assets/img/tukel.png" },
        { id: 10, name: "Product 10", price: 64.99, image: "assets/img/connox.jpg" }
    ];

    const productsCenter = document.querySelector('.products-center');
    const cartBtn = document.querySelector('.cart-btn');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotalAmount = document.querySelector('.cart-total-amount');
    const cartItemsCount = document.querySelector('.cart-items');

    let cart = [];

    function renderProducts() {
        let result = '';
        products.forEach(product => {
            result += `
                <article class="product">
                    <div class="img-container">
                        <img src="${product.image}" alt="${product.name}" class="product-img">
                        <button class="bag-btn" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                    </div>
                    <h3>${product.name}</h3>
                    <h4>$${product.price}</h4>
                </article>
            `;
        });
        productsCenter.innerHTML = result;
    }

    function updateCart() {
        cartItemsList.innerHTML = ''; 
        let cartTotalPrice = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <h5>$${item.price}</h5>
                    <span class="remove-item" data-id="${item.id}">remove</span>
                </div>
            `;
            cartItemsList.appendChild(cartItem);
            cartTotalPrice += item.price;
        });
        cartTotalAmount.textContent = cartTotalPrice.toFixed(2);
        cartItemsCount.textContent = cart.length;
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
        }
    }

    function addToCart() {
        const addToCartButtons = document.querySelectorAll('.bag-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                const productToAdd = products.find(product => product.id === productId);
                if (productToAdd) {
                    cart.push(productToAdd);
                    updateCart();
                    saveCartToLocalStorage();
                    cartDropdown.classList.add('active'); 
                }
            });
        });
    }

    function setupRemoveItem() {
        cartItemsList.addEventListener('click', event => {
            if (event.target.classList.contains('remove-item')) {
                const itemId = parseInt(event.target.dataset.id);
                cart = cart.filter(item => item.id !== itemId);
                updateCart();
                saveCartToLocalStorage();
            }
        });
    }

    cartBtn.addEventListener('click', () => {
        cartDropdown.classList.toggle('active');
    });

    window.addEventListener('click', event => {
        if (!cartBtn.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.classList.remove('active');
        }
    });

    function initApp() {
        renderProducts();
        addToCart();
        loadCartFromLocalStorage();
        setupRemoveItem();
    }

    initApp();
});
