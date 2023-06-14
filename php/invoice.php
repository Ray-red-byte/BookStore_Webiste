<?php session_start(); ?>
<?php
include("mysql_connect.inc.php");

$data = json_decode(file_get_contents('php://input'), true);
$bookAmounts = $data['bookAmounts'];
$paymentMethod = $data["paymentMethod"];
$shippingMethod = $data["shippingMethod"];
$invoiceMethod = $data["invoiceMethod"];
$address = $data["address"];
$totalPrice = $data["totalPrice"];
$user_id = (int)$_SESSION['user_id'];

// Prepare and execute the query to insert into INVOICE table
$sql_insert_invoice = "INSERT INTO INVOICE (INV_CUS_ID, INV_PAYMENT_METHOD, INV_METHOD, INV_SHIP_METHOD, INV_PRICE, INV_ADDRESS, INV_DATE) 
                       VALUES (?, ?, ?, ?, ?, ?, DATE_FORMAT(CURDATE(), '%y/%m/%d'))";
$stmt_insert_invoice = mysqli_prepare($conn, $sql_insert_invoice);
mysqli_stmt_bind_param($stmt_insert_invoice, "isssds", $user_id, $paymentMethod, $invoiceMethod, $shippingMethod, $totalPrice, $address);
$result_insert_invoice = mysqli_stmt_execute($stmt_insert_invoice);

if ($result_insert_invoice) {
    // Retrieve the invoice ID
    $sql_get_invoice_id = "SELECT INV_ID FROM INVOICE ORDER BY INV_ID DESC LIMIT 1";
    $result_invoice_id = mysqli_query($conn, $sql_get_invoice_id);
    $invoice_id = mysqli_fetch_assoc($result_invoice_id)['INV_ID'];

    // Retrieve all book IDs from the cart
    $sql_get_all_bookID = "SELECT CART_BOOK_ID FROM CART WHERE CART_CUS_ID = ?";
    $stmt_get_all_bookID = mysqli_prepare($conn, $sql_get_all_bookID);
    mysqli_stmt_bind_param($stmt_get_all_bookID, "i", $user_id);
    mysqli_stmt_execute($stmt_get_all_bookID);
    $result_book_ids = mysqli_stmt_get_result($stmt_get_all_bookID);
    
    $book_ids = [];
    while ($row = mysqli_fetch_assoc($result_book_ids)) {
        $book_ids[] = $row['CART_BOOK_ID'];
    }

    // Generate the SQL query for inserting into ORDERS
    $sql_insert_order = "INSERT INTO ORDERS (ORDER_INV_ID, ORDER_BOOK_ID, ORDER_BOOK_AMOUNT, ORDER_CUS_ID) VALUES (?, ?, ?, ?)";
    $stmt_insert_order = mysqli_prepare($conn, $sql_insert_order);
    mysqli_stmt_bind_param($stmt_insert_order, "iiii", $invoice_id, $book_id, $bookAmount, $user_id);

    // Execute the insertion query for each book ID
    foreach ($book_ids as $index => $book_id) {
        $bookAmount = (int)$bookAmounts[$index];
        mysqli_stmt_execute($stmt_insert_order);
    }

    // Delete cart items
    $sql_delete_cart = "DELETE FROM CART WHERE CART_CUS_ID = ?";
    $stmt_delete_cart = mysqli_prepare($conn, $sql_delete_cart);
    mysqli_stmt_bind_param($stmt_delete_cart, "i", $user_id);
    $result_delete_cart = mysqli_stmt_execute($stmt_delete_cart);

    // Update the book amount in the BOOK table
    $sql_update_book_amount = "UPDATE BOOK SET BOOK_AMOUNT = BOOK_AMOUNT - ? WHERE BOOK_ID = ?";
    $stmt_update_book_amount = mysqli_prepare($conn, $sql_update_book_amount);
    mysqli_stmt_bind_param($stmt_update_book_amount, "ii", $bookAmount, $book_id);

    // Execute the update query for each book ID and book amount
    foreach ($book_ids as $index => $book_id) {
        $bookAmount = (int)$bookAmounts[$index];
        mysqli_stmt_execute($stmt_update_book_amount);
    }

    if ($result_delete_cart) {
        echo json_encode('success');
    } else {
        echo json_encode(array('error' => 'Failed to insert order.'));
    }
} else {
    echo "<script>alert('Pay Error');</script>";
    echo json_encode(array('error' => 'Failed to insert order.'));
}
?>
