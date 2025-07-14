// Order Page JavaScript - The Napa's Kitchen

// Product Data - This would normally come from a database/API
const products = [
    // Buns & Burgers
    {
        id: 1,
        name: "DHAIYA BATTA",
        description: "A spicy hotdog with jumbo chicken sausage dipped in BBQ sauce, salad dressing, mayo, sauce (ketchup)",
        price: 300,
        category: "burgers",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_6.jpg"
    },
    {
        id: 2,
        name: "GRILLED CHICKEN & CHEESE ADIYA",
        description: "A 1 footlong grilled chicken with BBQ sauce submarine with cheese, egg, salad dressing, mayo & ketchup",
        price: 1000,
        category: "burgers",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_15.jpg"
    },
    {
        id: 3,
        name: "CRISPY CHICKEN & CHEESE ADIYA",
        description: "A 1 footlong crispy chicken submarine with cheese, egg, salad dressing, mayo & ketchup",
        price: 1200,
        category: "burgers",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_15.jpg"
    },
    {
        id: 4,
        name: "NAPA'S BURGER",
        description: "A juicy chicken patty burger with cheese, egg & ketchup",
        price: 800,
        category: "burgers",
        image: "images/501791199_1273624944659566_1460849381026049460_n.jpg"
    },
    
    // Bites
    {
        id: 5,
        name: "MASALA FRIES",
        description: "Crispy french fries dusted with our special masala spice mix",
        price: 550,
        category: "bites",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_13.jpg"
    },
    {
        id: 6,
        name: "CHEESE BALLS (4PCS)",
        description: "Deep-fried cheese balls coated in crispy breadcrumbs",
        price: 800,
        category: "bites",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_21.jpg"
    },
    {
        id: 7,
        name: "NAPA'S HOT WINGS (5PCS)",
        description: "Spicy chicken wings tossed in our signature hot sauce",
        price: 950,
        category: "bites",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_17.jpg"
    },
    
    // Noodles & Pasta
    {
        id: 8,
        name: "MAMMA MIA",
        description: "Thick noodles cooked with savory sauces, bell pepper, chicken, veggies for 01 person",
        price: 1500,
        category: "noodles",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_3.jpg"
    },
    {
        id: 9,
        name: "SPAGHETTI BOLOGNA",
        description: "Perfectly cooked spaghetti with chicken bologna for 01 person",
        price: 1000,
        category: "noodles",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_19.jpg"
    },
    {
        id: 10,
        name: "CHICKEN MAC & CHEESE",
        description: "Creamy macaroni and cheese with grilled chicken pieces",
        price: 1200,
        category: "noodles",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_5.jpg"
    },
    
    // Rice & Kottu
    {
        id: 11,
        name: "R/K PODDA",
        description: "01 person portion with chicken kottu & fried rice",
        price: 700,
        category: "rice",
        image: "images/orders/PHOTO-2025-07-13-19-41-14.jpg"
    },
    {
        id: 12,
        name: "1KG R/K LOKKA",
        description: "02 person 1kg portion with chicken kottu & fried rice",
        price: 1650,
        category: "rice",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_7.jpg"
    },
    {
        id: 13,
        name: "NASI GORENG",
        description: "Indonesian style fried rice with chicken, prawns, and topped with fried egg",
        price: 1200,
        category: "rice",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_11.jpg"
    },
    {
        id: 14,
        name: "MONGOLIAN RICE",
        description: "Stir-fried rice with vegetables and chicken in a sweet and savory sauce",
        price: 900,
        category: "rice",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_9.jpg"
    },
    
    // Lunch Packs
    {
        id: 15,
        name: "RICE & CURRY",
        description: "Traditional Sri Lankan rice and curry with chicken and 3 vegetables",
        price: 450,
        category: "lunch",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_20.jpg"
    },
    {
        id: 16,
        name: "CHOP SUEY",
        description: "Mixed vegetables and chicken stir-fried in soy sauce, served with rice",
        price: 750,
        category: "lunch",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_2.jpg"
    },
    {
        id: 17,
        name: "BIRIYANI",
        description: "Fragrant basmati rice cooked with spices and chicken, served with raita",
        price: 800,
        category: "lunch",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_18.jpg"
    },
    
    // Beverages & Desserts
    {
        id: 18,
        name: "WATALAPPAN",
        description: "Traditional Sri Lankan coconut custard dessert with jaggery and spices",
        price: 300,
        category: "beverages",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_4.jpg"
    },
    {
        id: 19,
        name: "CHOCOLATE MOUSSE",
        description: "Rich and creamy chocolate mousse topped with chocolate shavings",
        price: 450,
        category: "beverages",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_10.jpg"
    },
    {
        id: 20,
        name: "FRESH FRUIT JUICE",
        description: "Choice of watermelon, pineapple, papaya, or mixed fruit",
        price: 300,
        category: "beverages",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_1.jpg"
    },
    {
        id: 21,
        name: "MILKSHAKES",
        description: "Creamy milkshakes in vanilla, chocolate, strawberry, or coffee flavors",
        price: 450,
        category: "beverages",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_12.jpg"
    },
    {
        id: 22,
        name: "FALUDA",
        description: "Traditional Sri Lankan cold dessert drink with rose syrup, basil seeds, and ice cream",
        price: 500,
        category: "beverages",
        image: "images/orders/PHOTO-2025-07-13-19-41-14_8.jpg"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('napaCart')) || [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const floatingCartCount = document.getElementById('floating-cart-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartUI();
    setupEventListeners();
});

// Display products
function displayProducts(category = 'all') {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.setAttribute('data-category', product.category);
    
    div.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
            <div class="product-actions">
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${product.id})">-</button>
                    <input type="number" class="qty-input" id="qty-${product.id}" value="1" min="1" max="10">
                    <button class="qty-btn" onclick="increaseQuantity(${product.id})">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fa fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    return div;
}

// Quantity controls
function increaseQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const currentValue = parseInt(input.value);
    if (currentValue < 10) {
        input.value = currentValue + 1;
    }
}

function decreaseQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartUI();
    showAddedToCartAnimation(productId);
    
    // Reset quantity to 1
    document.getElementById(`qty-${productId}`).value = 1;
}

// Show added to cart animation
function showAddedToCartAnimation(productId) {
    const button = document.querySelector(`button[onclick="addToCart(${productId})"]`);
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fa fa-check"></i> Added!';
    button.classList.add('success-animation');
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('success-animation');
        button.disabled = false;
    }, 1500);
}

// Update cart UI
function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        // Add bounce animation when count changes
        cartCount.classList.remove('cart-count-bounce');
        setTimeout(() => cartCount.classList.add('cart-count-bounce'), 10);
        setTimeout(() => cartCount.classList.remove('cart-count-bounce'), 310);
    }
    if (floatingCartCount) {
        floatingCartCount.textContent = totalItems;
        if (totalItems > 0) {
            floatingCartCount.classList.remove('hidden');
        } else {
            floatingCartCount.classList.add('hidden');
        }
    }
}

function updateCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p>Add some delicious items to get started!</p>
            </div>
        `;
        checkoutBtn.disabled = true;
        return;
    }
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItems.appendChild(cartItem);
    });
    
    checkoutBtn.disabled = false;
}

function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    div.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
            <div class="cart-item-controls">
                <button class="cart-qty-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="cart-qty-display">${item.quantity}</span>
                <button class="cart-qty-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="cart-qty-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: #dc3545;">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    return div;
}

function updateCartItemQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 200 : 0;
    const total = subtotal + deliveryFee;
    
    cartSubtotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
    cartTotal.textContent = `Rs. ${total.toLocaleString()}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('napaCart', JSON.stringify(cart));
}

// Event listeners
function setupEventListeners() {
    // Category filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Cart toggle
    document.getElementById('cart-toggle').addEventListener('click', function(e) {
        e.preventDefault();
        toggleCart();
    });
    
    // Floating cart toggle
    const floatingCartBtn = document.getElementById('floating-cart-btn');
    if (floatingCartBtn) {
        floatingCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCart();
        });
    }
    
    // Close cart
    document.getElementById('close-cart').addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            proceedToCheckout();
        }
    });
    
    // Prevent cart from closing when clicking inside
    cartSidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Filter products with animation
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Cart toggle functions
function toggleCart() {
    if (cartSidebar.classList.contains('open')) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Proceed to checkout
function proceedToCheckout() {
    // Save current cart state
    localStorage.setItem('napaCheckoutCart', JSON.stringify(cart));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Handle ESC key to close cart
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
        closeCart();
    }
});

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Export functions for global access
window.addToCart = addToCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeFromCart = removeFromCart;
