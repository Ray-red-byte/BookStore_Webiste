<?php
include("mysql_connect.inc.php");

$json = file_get_contents("php://input");
$object = json_decode($json, true);
$invoiceID = (int)$object['invoiceId'];

$sql_invoice_delete = "DELETE FROM INVOICE WHERE INV_ID = '$invoiceID'";
$sql_order_delete = "DELETE FROM ORDERS WHERE ORDER_INV_ID = '$invoiceID'";

$result_invoice_delete = mysqli_query($conn, $sql_invoice_delete);
$result_order_delete = mysqli_query($conn, $sql_order_delete);

if ($result_invoice_delete) {
    echo 'Success';
}

?>
