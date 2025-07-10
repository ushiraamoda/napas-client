-- Database Schema for The Napa's Kitchen Ordering System
-- MySQL/MariaDB compatible

-- Create database
CREATE DATABASE IF NOT EXISTS napas_kitchen;
USE napas_kitchen;

-- Customers table
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    postal_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_phone (phone)
);

-- Products table (for inventory management)
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category ENUM('burgers', 'bites', 'noodles', 'rice', 'lunch', 'beverages') NOT NULL,
    image VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_available (available)
);

-- Orders table
CREATE TABLE orders (
    id VARCHAR(20) PRIMARY KEY,
    customer_id INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 200.00,
    total DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash', 'card') NOT NULL DEFAULT 'cash',
    delivery_time VARCHAR(20) DEFAULT 'asap',
    order_notes TEXT,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'dispatched', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_customer (customer_id)
);

-- Order items table
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(20) NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order (order_id)
);

-- Order status history (optional - for tracking order progress)
CREATE TABLE order_status_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(20) NOT NULL,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'dispatched', 'delivered', 'cancelled') NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_status (status)
);

-- Insert sample products
INSERT INTO products (id, name, description, price, category, image) VALUES
-- Burgers
(1, 'DHAIYA BATTA', 'A spicy hotdog with jumbo chicken sausage dipped in BBQ sauce, salad dressing, mayo, sauce (ketchup)', 300.00, 'burgers', 'images/490437887_1235698505118877_4546141424839669555_n.jpg'),
(2, 'GRILLED CHICKEN & CHEESE ADIYA', 'A 1 footlong grilled chicken with BBQ sauce submarine with cheese, egg, salad dressing, mayo & ketchup', 1000.00, 'burgers', 'images/492247416_1245385630816831_2545052358866347327_n.jpg'),
(3, 'CRISPY CHICKEN & CHEESE ADIYA', 'A 1 footlong crispy chicken submarine with cheese, egg, salad dressing, mayo & ketchup', 1200.00, 'burgers', 'images/493348953_1270178605004200_4998168804669485410_n.jpg'),
(4, 'NAPA\'S BURGER', 'A juicy chicken patty burger with cheese, egg & ketchup', 800.00, 'burgers', 'images/501791199_1273624944659566_1460849381026049460_n.jpg'),

-- Bites
(5, 'MASALA FRIES', 'Crispy french fries dusted with our special masala spice mix', 550.00, 'bites', 'images/495570368_1257091479646246_1932760828936604358_n.jpg'),
(6, 'CHEESE BALLS (4PCS)', 'Deep-fried cheese balls coated in crispy breadcrumbs', 800.00, 'bites', 'images/498947072_1265321452156582_3828794308186300699_n.jpg'),
(7, 'NAPA\'S HOT WINGS (5PCS)', 'Spicy chicken wings tossed in our signature hot sauce', 950.00, 'bites', 'images/499008583_1265319558823438_8816504532566095577_n.jpg'),

-- Noodles
(8, 'MAMMA MIA', 'Thick noodles cooked with savory sauces, bell pepper, chicken, veggies for 01 person', 1500.00, 'noodles', 'images/slider/slider-img-1.jpg'),
(9, 'SPAGHETTI BOLOGNA', 'Perfectly cooked spaghetti with chicken bologna for 01 person', 1000.00, 'noodles', 'images/slider/slider-img-2.jpg'),
(10, 'CHICKEN MAC & CHEESE', 'Creamy macaroni and cheese with grilled chicken pieces', 1200.00, 'noodles', 'images/slider/slider-img-3.jpg'),

-- Rice
(11, 'R/K PODDA', '01 person portion with chicken kottu & fried rice', 700.00, 'rice', 'images/slider/slider-img-4.jpg'),
(12, '1KG R/K LOKKA', '02 person 1kg portion with chicken kottu & fried rice', 1650.00, 'rice', 'images/490426960_1236371781718216_7890033672047684204_n.jpg'),
(13, 'NASI GORENG', 'Indonesian style fried rice with chicken, prawns, and topped with fried egg', 1200.00, 'rice', 'images/499245128_1265322362156491_9194782666637593265_n.jpg'),
(14, 'MONGOLIAN RICE', 'Stir-fried rice with vegetables and chicken in a sweet and savory sauce', 900.00, 'rice', 'images/500706378_1271717854850275_4080909277663704757_n.jpg'),

-- Lunch
(15, 'RICE & CURRY', 'Traditional Sri Lankan rice and curry with chicken and 3 vegetables', 450.00, 'lunch', 'images/492005159_1244147894273938_5930011372659427058_n.jpg'),
(16, 'CHOP SUEY', 'Mixed vegetables and chicken stir-fried in soy sauce, served with rice', 750.00, 'lunch', 'images/495570702_1257091352979592_6061647264181732045_n.jpg'),
(17, 'BIRIYANI', 'Fragrant basmati rice cooked with spices and chicken, served with raita', 800.00, 'lunch', 'images/449342083_1009858631036200_307436958771202623_n.jpg'),

-- Beverages
(18, 'WATALAPPAN', 'Traditional Sri Lankan coconut custard dessert with jaggery and spices', 300.00, 'beverages', 'images/photo/photo-1.jpg'),
(19, 'CHOCOLATE MOUSSE', 'Rich and creamy chocolate mousse topped with chocolate shavings', 450.00, 'beverages', 'images/photo/photo-2.jpg'),
(20, 'FRESH FRUIT JUICE', 'Choice of watermelon, pineapple, papaya, or mixed fruit', 300.00, 'beverages', 'images/photo/photo-3.jpg'),
(21, 'MILKSHAKES', 'Creamy milkshakes in vanilla, chocolate, strawberry, or coffee flavors', 450.00, 'beverages', 'images/photo/photo-4.jpg'),
(22, 'FALUDA', 'Traditional Sri Lankan cold dessert drink with rose syrup, basil seeds, and ice cream', 500.00, 'beverages', 'images/cooker-img.jpg');

-- Create views for easier data access
CREATE VIEW order_summary AS
SELECT 
    o.id,
    o.status,
    o.total,
    o.created_at,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.phone,
    c.email,
    c.address,
    c.city
FROM orders o
JOIN customers c ON o.customer_id = c.id;

CREATE VIEW daily_sales AS
SELECT 
    DATE(created_at) AS date,
    COUNT(*) AS total_orders,
    SUM(total) AS total_revenue,
    AVG(total) AS average_order_value
FROM orders
WHERE status != 'cancelled'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Create stored procedures for common operations
DELIMITER //

-- Procedure to update order status
CREATE PROCEDURE UpdateOrderStatus(
    IN order_id_param VARCHAR(20),
    IN new_status ENUM('pending', 'confirmed', 'preparing', 'ready', 'dispatched', 'delivered', 'cancelled'),
    IN notes_param TEXT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    UPDATE orders SET status = new_status WHERE id = order_id_param;
    
    INSERT INTO order_status_history (order_id, status, notes) 
    VALUES (order_id_param, new_status, notes_param);
    
    COMMIT;
END //

-- Procedure to get order details
CREATE PROCEDURE GetOrderDetails(IN order_id_param VARCHAR(20))
BEGIN
    SELECT 
        o.*,
        CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
        c.phone,
        c.email,
        c.address,
        c.city,
        c.postal_code
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.id = order_id_param;
    
    SELECT 
        oi.*,
        p.name AS product_name,
        p.category
    FROM order_items oi
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = order_id_param;
END //

DELIMITER ;

-- Create indexes for better performance
CREATE INDEX idx_orders_date_status ON orders(created_at, status);
CREATE INDEX idx_customers_name ON customers(first_name, last_name);
CREATE INDEX idx_products_name ON products(name);

-- Add triggers for audit trail
DELIMITER //

CREATE TRIGGER order_status_trigger
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO order_status_history (order_id, status, notes)
        VALUES (NEW.id, NEW.status, CONCAT('Status changed from ', OLD.status, ' to ', NEW.status));
    END IF;
END //

DELIMITER ;

-- Grant permissions (adjust as needed)
-- CREATE USER 'napa_user'@'localhost' IDENTIFIED BY 'secure_password';
-- GRANT SELECT, INSERT, UPDATE ON napas_kitchen.* TO 'napa_user'@'localhost';
-- FLUSH PRIVILEGES;
