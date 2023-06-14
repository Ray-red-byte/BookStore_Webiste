<?php session_start(); ?>
<?php
include("mysql_connect.inc.php");

$user_id = $_SESSION['user_id'];
$sql_invoice_search = "SELECT BOOK_NAME, ORDER_BOOK_AMOUNT, INV_PAYMENT_METHOD AS PAYMENT_METHOD, INV_METHOD AS Invoice_Method, INV_SHIP_METHOD AS Ship_Method, INV_ADDRESS, INV_DATE, BOOK_PRICE FROM 
                       (ORDERS 
                       JOIN BOOK ON BOOK.BOOK_ID =  ORDERS.ORDER_BOOK_ID
                       JOIN INVOICE ON INVOICE.INV_ID = ORDERS.ORDER_INV_ID)
                       WHERE ORDERS.ORDER_CUS_ID = '$user_id'";
$result_invoice_search = mysqli_query($conn, $sql_invoice_search);

if (mysqli_num_rows($result_invoice_search) > 0) 
{
    $invoices = array();
    while ($row = mysqli_fetch_assoc($result_invoice_search)) {
      $invoices[] = $row;
    }
    echo json_encode($invoices);
}
else 
{
    echo json_encode(array('error' => 'no'));
}
?>