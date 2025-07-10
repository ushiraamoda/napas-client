// Checkout Page JavaScript - The Napa's Kitchen

let currentStep = 1;
let cart = [];
let customerData = {};

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadCartData();
    displayOrderItems();
    updateOrderSummary();
    setupEventListeners();
    
    // Check if cart is empty
    if (cart.length === 0) {
        alert('Your cart is empty. Redirecting to menu...');
        window.location.href = 'order.html';
        return;
    }
});

// Load cart data from localStorage
function loadCartData() {
    const savedCart = localStorage.getItem('napaCheckoutCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        // Fallback to regular cart
        const regularCart = localStorage.getItem('napaCart');
        if (regularCart) {
            cart = JSON.parse(regularCart);
        }
    }
}

// Display order items in step 1
function displayOrderItems() {
    const orderItemsContainer = document.getElementById('order-items');
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>No items in cart</p>';
        return;
    }
    
    orderItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        orderItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">Quantity: ${item.quantity}</div>
                <div class="item-total">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
            </div>
        `;
        
        orderItemsContainer.appendChild(orderItem);
    });
}

// Update order summary sidebar
function updateOrderSummary() {
    const summaryItemsContainer = document.getElementById('summary-items');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 200;
    const total = subtotal + deliveryFee;
    
    // Update summary items
    summaryItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        
        summaryItem.innerHTML = `
            <div>
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
        `;
        
        summaryItemsContainer.appendChild(summaryItem);
    });
    
    // Update totals
    document.getElementById('summary-subtotal').textContent = `Rs. ${subtotal.toLocaleString()}`;
    document.getElementById('summary-delivery').textContent = `Rs. ${deliveryFee.toLocaleString()}`;
    document.getElementById('summary-total').textContent = `Rs. ${total.toLocaleString()}`;
}

// Setup event listeners
function setupEventListeners() {
    // Delivery time dropdown
    const deliveryTimeSelect = document.getElementById('deliveryTime');
    const customTimeDiv = document.getElementById('custom-time');
    
    deliveryTimeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customTimeDiv.classList.remove('custom-time-hidden');
        } else {
            customTimeDiv.classList.add('custom-time-hidden');
        }
    });
    
    // Real-time form validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                validateSingleField(fieldId);
            });
            
            field.addEventListener('blur', function() {
                validateSingleField(fieldId);
            });
        }
    });
    
    // Terms checkbox
    const termsCheckbox = document.getElementById('terms');
    const placeOrderBtn = document.getElementById('place-order-btn');
    
    if (termsCheckbox && placeOrderBtn) {
        termsCheckbox.addEventListener('change', function() {
            placeOrderBtn.disabled = !this.checked;
        });
    }
}

// Validate a single field in real-time
function validateSingleField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const value = field.value.trim();
    
    // Remove previous styling
    field.classList.remove('error', 'valid');
    
    // Check if field is required and empty
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    const isRequired = requiredFields.includes(fieldId);
    
    if (isRequired && !value) {
        field.classList.add('error');
        return false;
    }
    
    // Specific validation for email
    if (fieldId === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    // Specific validation for phone
    if (fieldId === 'phone' && value) {
        const phoneRegex = /^(\+94|94|0)?[0-9\s\-]{8,12}$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    // Field is valid
    if (value) {
        field.classList.add('valid');
    }
    
    return true;
}

// Step navigation
function nextStep() {
    if (currentStep === 1) {
        // Go to step 2
        showStep(2);
    } else if (currentStep === 2) {
        // Validate form before going to step 3
        if (validateForm()) {
            collectCustomerData();
            showConfirmation();
            showStep(3);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.checkout-step').forEach(stepDiv => {
        stepDiv.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step-${step}`).classList.add('active');
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((stepIndicator, index) => {
        if (index + 1 <= step) {
            stepIndicator.classList.add('active');
        } else {
            stepIndicator.classList.remove('active');
        }
    });
    
    currentStep = step;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Form validation
function validateForm() {
    const requiredFields = [
        'firstName', 'lastName', 'email', 'phone', 'address', 'city'
    ];
    
    let isValid = true;
    let errorMessages = [];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        // Remove previous error styling
        field.classList.remove('error');
        
        if (!value) {
            field.classList.add('error');
            const label = document.querySelector(`label[for="${fieldId}"]`);
            const fieldName = label ? label.textContent.replace('*', '').trim() : fieldId;
            errorMessages.push(`${fieldName} is required`);
            isValid = false;
        }
    });
    
    // Validate email format
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        document.getElementById('email').classList.add('error');
        errorMessages.push('Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone format (more flexible Sri Lankan format)
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^(\+94|94|0)?[0-9\s\-]{8,12}$/;
    if (phone && !phoneRegex.test(phone)) {
        document.getElementById('phone').classList.add('error');
        errorMessages.push('Please enter a valid phone number (e.g., +94 77 XXX XXXX or 077 XXX XXXX)');
        isValid = false;
    }
    
    if (!isValid && currentStep === 2) {
        if (errorMessages.length > 0) {
            alert('Please fix the following issues:\n\n• ' + errorMessages.join('\n• '));
        } else {
            alert('Please fill in all required fields correctly.');
        }
    }
    
    return isValid;
}

// Collect customer data
function collectCustomerData() {
    customerData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        postalCode: document.getElementById('postalCode').value.trim(),
        orderNotes: document.getElementById('orderNotes').value.trim(),
        deliveryTime: document.getElementById('deliveryTime').value,
        customDeliveryTime: document.getElementById('customDeliveryTime').value
    };
}

// Show confirmation details
function showConfirmation() {
    // Customer info summary
    const customerSummary = document.getElementById('customer-summary');
    customerSummary.innerHTML = `
        <div class="info-row">
            <span class="info-label">Name:</span>
            <span class="info-value">${customerData.firstName} ${customerData.lastName}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Email:</span>
            <span class="info-value">${customerData.email}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Phone:</span>
            <span class="info-value">${customerData.phone}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Address:</span>
            <span class="info-value">${customerData.address}, ${customerData.city}</span>
        </div>
        ${customerData.orderNotes ? `
        <div class="info-row">
            <span class="info-label">Notes:</span>
            <span class="info-value">${customerData.orderNotes}</span>
        </div>
        ` : ''}
        <div class="info-row">
            <span class="info-label">Delivery:</span>
            <span class="info-value">${getDeliveryTimeText()}</span>
        </div>
    `;
    
    // Final order items
    const finalOrderItems = document.getElementById('final-order-items');
    finalOrderItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'summary-item';
        itemDiv.innerHTML = `
            <div>
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
        `;
        finalOrderItems.appendChild(itemDiv);
    });
}

// Get delivery time text
function getDeliveryTimeText() {
    const deliveryTime = customerData.deliveryTime;
    
    switch (deliveryTime) {
        case 'asap':
            return 'As soon as possible (45-60 minutes)';
        case '1hour':
            return 'Within 1 hour';
        case '2hours':
            return 'Within 2 hours';
        case '3hours':
            return 'Within 3 hours';
        case 'custom':
            return `Custom time: ${customerData.customDeliveryTime}`;
        default:
            return 'As soon as possible';
    }
}

// Place order
function placeOrder() {
    const placeOrderBtn = document.getElementById('place-order-btn');
    const termsChecked = document.getElementById('terms').checked;
    
    if (!termsChecked) {
        alert('Please accept the terms and conditions to continue.');
        return;
    }
    
    // Show loading state
    placeOrderBtn.innerHTML = '<span class="loading"></span> Processing...';
    placeOrderBtn.disabled = true;
    placeOrderBtn.classList.add('loading-btn');
    
    // Simulate order processing
    setTimeout(() => {
        processOrder();
    }, 2000);
}

// Process order (this would normally send to server)
function processOrder() {
    const orderData = {
        id: generateOrderId(),
        customer: customerData,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        deliveryFee: 200,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 200,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    // Save order to localStorage (in real app, send to server)
    let orders = JSON.parse(localStorage.getItem('napaOrders')) || [];
    orders.push(orderData);
    localStorage.setItem('napaOrders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('napaCart');
    localStorage.removeItem('napaCheckoutCart');
    
    // Show success modal
    showSuccessModal(orderData);
    
    // Log order data for debugging (remove in production)
    console.log('Order placed:', orderData);
}

// Generate order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `NP${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
}

// Show success modal
function showSuccessModal(orderData) {
    document.getElementById('order-id').textContent = orderData.id;
    
    // Calculate estimated delivery time
    const estimatedTime = new Date();
    estimatedTime.setMinutes(estimatedTime.getMinutes() + 60); // Default 60 minutes
    document.getElementById('estimated-delivery').textContent = estimatedTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Show modal
    $('#success-modal').modal({
        backdrop: 'static',
        keyboard: false
    });
}

// PHP Server Integration Functions (for future implementation)
function sendOrderToServer(orderData) {
    // This function would send the order to a PHP backend
    return fetch('api/orders.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order sent to server:', data);
        return data;
    })
    .catch(error => {
        console.error('Error sending order:', error);
        throw error;
    });
}

function validateOrderOnServer(orderData) {
    // This function would validate the order on the server
    return fetch('api/validate-order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error validating order:', error);
        return { valid: false, message: 'Validation failed' };
    });
}

// Debug function to help troubleshoot validation issues
function debugFormValidation() {
    console.log('=== FORM VALIDATION DEBUG ===');
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const value = field.value.trim();
            console.log(`${fieldId}: "${value}" (length: ${value.length}, valid: ${value.length > 0})`);
        } else {
            console.log(`${fieldId}: FIELD NOT FOUND`);
        }
    });
    
    // Test email validation
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(`Email validation: "${email}" -> ${emailRegex.test(email)}`);
    
    // Test phone validation
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^(\+94|94|0)?[0-9\s\-]{8,12}$/;
    console.log(`Phone validation: "${phone}" -> ${phoneRegex.test(phone)}`);
    
    console.log('Current step:', currentStep);
    console.log('=== END DEBUG ===');
}

// Add debug button (temporary)
document.addEventListener('DOMContentLoaded', function() {
    // Add debug button for testing
    setTimeout(() => {
        const debugBtn = document.createElement('button');
        debugBtn.textContent = 'Debug Validation';
        debugBtn.type = 'button';
        debugBtn.className = 'btn btn-info';
        debugBtn.style.position = 'fixed';
        debugBtn.style.top = '10px';
        debugBtn.style.right = '10px';
        debugBtn.style.zIndex = '9999';
        debugBtn.onclick = debugFormValidation;
        document.body.appendChild(debugBtn);
    }, 1000);
});

// Export functions for global access
window.nextStep = nextStep;
window.prevStep = prevStep;
window.placeOrder = placeOrder;

// Add error styling to CSS
const style = document.createElement('style');
style.textContent = `
    .form-control.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
`;
document.head.appendChild(style);
