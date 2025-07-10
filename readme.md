# The Napa's Kitchen - Online Ordering System

A complete restaurant website with online ordering functionality for The Napa's Kitchen in Ragama, Sri Lanka.

## Features

### Frontend Features
- **Responsive Design**: Mobile-friendly layout using Bootstrap
- **Product Catalog**: Organized menu with categories and filtering
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout Process**: Multi-step order form with validation
- **Local Storage**: Cart persists between sessions
- **Smooth Animations**: WOW.js animations and transitions
- **Modern UI**: Clean, professional design

### Backend Ready
- **PHP API**: Ready-to-use PHP backend for order processing
- **Database Schema**: Complete MySQL database structure
- **Order Management**: Status tracking and order history
- **Customer Management**: Customer data storage and retrieval

## File Structure

```
napas-restaurant-html/
├── index.html              # Main homepage
├── order.html              # Product catalog and ordering page
├── checkout.html            # Multi-step checkout process
├── css/
│   ├── main.css            # Main stylesheet
│   ├── order.css           # Order page specific styles
│   ├── checkout.css        # Checkout page specific styles
│   └── ...                 # Other CSS files
├── js/
│   ├── order.js            # Order page functionality
│   ├── checkout.js         # Checkout process logic
│   └── ...                 # Other JavaScript files
├── images/                 # Product and UI images
├── api/
│   └── orders.php          # PHP backend for order processing
└── database/
    └── schema.sql          # MySQL database schema
```

## Getting Started

### 1. Frontend Setup
1. Clone or download the project files
2. Open `index.html` in a web browser
3. Navigate to the order page to test the ordering system

### 2. Backend Setup (Optional)

#### Prerequisites
- PHP 7.4 or higher
- MySQL/MariaDB database
- Web server (Apache/Nginx)

#### Database Setup
1. Create a MySQL database:
   ```sql
   CREATE DATABASE napas_kitchen;
   ```

2. Import the schema:
   ```bash
   mysql -u your_username -p napas_kitchen < database/schema.sql
   ```

#### PHP Configuration
1. Update database credentials in `api/orders.php`:
   ```php
   $db_host = 'localhost';
   $db_name = 'napas_kitchen';
   $db_user = 'your_username';
   $db_pass = 'your_password';
   ```

2. Enable PHP extensions:
   - PDO
   - PDO_MySQL

3. Configure web server to serve the files

#### Enable Backend Integration
In `js/checkout.js`, uncomment the server integration:
```javascript
// Replace the localStorage save with:
sendOrderToServer(orderData)
    .then(response => {
        showSuccessModal(response);
    })
    .catch(error => {
        alert('Error processing order: ' + error.message);
    });
```

## Usage

### Customer Journey
1. **Browse Menu**: Customers start at the homepage and navigate to order page
2. **Select Items**: Filter by category and add items to cart
3. **Review Cart**: View cart contents and modify quantities
4. **Checkout**: Fill in customer information and delivery details
5. **Confirm Order**: Review order details and place order
6. **Confirmation**: Receive order confirmation with ID

### Order Management
Orders are stored in the database with the following statuses:
- `pending`: Order received
- `confirmed`: Order confirmed by restaurant
- `preparing`: Food being prepared
- `ready`: Ready for pickup/delivery
- `dispatched`: Out for delivery
- `delivered`: Successfully delivered
- `cancelled`: Order cancelled

## Customization

### Adding New Products
1. Add product data to `js/order.js` in the `products` array
2. Add product to database using the `products` table
3. Add product images to the `images/` directory

### Modifying Categories
1. Update category buttons in `order.html`
2. Update filter functionality in `js/order.js`
3. Update database enum values if needed

### Styling Changes
- Main styles: `css/main.css`
- Order page: `css/order.css`
- Checkout page: `css/checkout.css`

## API Endpoints

### POST /api/orders.php
Process new orders

**Request Body:**
```json
{
  "id": "NP123456789",
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+94771234567",
    "address": "123 Main St",
    "city": "Colombo"
  },
  "items": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 500,
      "quantity": 2
    }
  ],
  "subtotal": 1000,
  "deliveryFee": 200,
  "total": 1200,
  "paymentMethod": "cash"
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "NP123456789",
  "message": "Order placed successfully",
  "estimatedDelivery": "2025-07-10 14:30:00"
}
```

## Security Considerations

### Frontend
- Input validation and sanitization
- XSS prevention
- CSRF protection for forms

### Backend
- SQL injection prevention using prepared statements
- Input validation and sanitization
- Rate limiting for API endpoints
- HTTPS enforcement
- Secure session management

## Production Deployment

### Frontend
1. Optimize images
2. Minify CSS and JavaScript
3. Enable gzip compression
4. Set up CDN for static assets

### Backend
1. Use environment variables for configuration
2. Implement proper error logging
3. Set up monitoring and alerts
4. Configure automated backups
5. Implement SSL/TLS certificates

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies
- Bootstrap 3.x
- jQuery 1.10.2
- Font Awesome 4.x
- WOW.js
- Owl Carousel

## License
This project is proprietary software for The Napa's Kitchen.

## Support
For technical support or questions, contact the development team.

## Future Enhancements
- [ ] Payment gateway integration
- [ ] Real-time order tracking
- [ ] Customer reviews and ratings
- [ ] Loyalty program
- [ ] Multi-language support
- [ ] Admin dashboard
- [ ] Push notifications
- [ ] Email confirmations
- [ ] SMS notifications
- [ ] Inventory management# napas-client
