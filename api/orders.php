<?php
/**
 * The Napa's Kitchen - Order API
 * Simple PHP backend example for handling orders
 * 
 * This file demonstrates how to handle incoming orders from the frontend.
 * In a production environment, you would:
 * 1. Validate all incoming data
 * 2. Sanitize inputs to prevent SQL injection
 * 3. Use prepared statements
 * 4. Implement proper error handling
 * 5. Add authentication if needed
 * 6. Send confirmation emails
 * 7. Integrate with payment gateways
 */

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Database configuration (replace with your actual database details)
$db_host = 'localhost';
$db_name = 'napas_kitchen';
$db_user = 'your_username';
$db_pass = 'your_password';

try {
    // Connect to database
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get JSON data from request
    $json = file_get_contents('php://input');
    $orderData = json_decode($json, true);
    
    // Validate required fields
    if (!$orderData || !isset($orderData['customer']) || !isset($orderData['items'])) {
        throw new Exception('Invalid order data');
    }
    
    // Validate customer data
    $customer = $orderData['customer'];
    $requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    
    foreach ($requiredFields as $field) {
        if (empty($customer[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }
    
    // Validate email format
    if (!filter_var($customer['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Validate items
    if (empty($orderData['items'])) {
        throw new Exception('No items in order');
    }
    
    // Start transaction
    $pdo->beginTransaction();
    
    // Insert customer data
    $customerStmt = $pdo->prepare("
        INSERT INTO customers (first_name, last_name, email, phone, address, city, postal_code) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        phone = VALUES(phone),
        address = VALUES(address),
        city = VALUES(city),
        postal_code = VALUES(postal_code)
    ");
    
    $customerStmt->execute([
        $customer['firstName'],
        $customer['lastName'],
        $customer['email'],
        $customer['phone'],
        $customer['address'],
        $customer['city'],
        $customer['postalCode'] ?? ''
    ]);
    
    $customerId = $pdo->lastInsertId() ?: $pdo->query("SELECT id FROM customers WHERE email = " . $pdo->quote($customer['email']))->fetchColumn();
    
    // Insert order
    $orderStmt = $pdo->prepare("
        INSERT INTO orders (id, customer_id, subtotal, delivery_fee, total, payment_method, delivery_time, order_notes, status, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    ");
    
    $orderStmt->execute([
        $orderData['id'],
        $customerId,
        $orderData['subtotal'],
        $orderData['deliveryFee'],
        $orderData['total'],
        $orderData['paymentMethod'],
        $customer['deliveryTime'] ?? 'asap',
        $customer['orderNotes'] ?? ''
    ]);
    
    // Insert order items
    $itemStmt = $pdo->prepare("
        INSERT INTO order_items (order_id, product_id, product_name, quantity, price, total) 
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    
    foreach ($orderData['items'] as $item) {
        $itemStmt->execute([
            $orderData['id'],
            $item['id'],
            $item['name'],
            $item['quantity'],
            $item['price'],
            $item['price'] * $item['quantity']
        ]);
    }
    
    // Commit transaction
    $pdo->commit();
    
    // Log the order (optional)
    error_log("New order received: " . $orderData['id'] . " from " . $customer['email']);
    
    // Send confirmation email (implement this function)
    // sendOrderConfirmationEmail($customer, $orderData);
    
    // Send SMS notification (implement this function)
    // sendSMSNotification($customer['phone'], $orderData['id']);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'orderId' => $orderData['id'],
        'message' => 'Order placed successfully',
        'estimatedDelivery' => date('Y-m-d H:i:s', strtotime('+60 minutes'))
    ]);
    
} catch (Exception $e) {
    // Rollback transaction on error
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollback();
    }
    
    // Log error
    error_log("Order processing error: " . $e->getMessage());
    
    // Return error response
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

/**
 * Function to send order confirmation email
 * You would implement this using a library like PHPMailer
 */
function sendOrderConfirmationEmail($customer, $orderData) {
    // Implementation would go here
    // Example using mail() function (not recommended for production):
    /*
    $to = $customer['email'];
    $subject = 'Order Confirmation - ' . $orderData['id'];
    $message = "Thank you for your order!\n\nOrder ID: " . $orderData['id'] . "\nTotal: Rs. " . number_format($orderData['total']);
    $headers = 'From: orders@thenapaskitchen.com';
    
    mail($to, $subject, $message, $headers);
    */
}

/**
 * Function to send SMS notification
 * You would implement this using an SMS service like Twilio
 */
function sendSMSNotification($phone, $orderId) {
    // Implementation would go here
    // Example SMS: "Your order #$orderId has been received and is being prepared. Thank you! - The Napa's Kitchen"
}
?>
