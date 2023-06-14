<?php
include("mysql_connect.inc.php");

$json = file_get_contents("php://input");
$object = json_decode($json, true);
$orderID = (int)$object['orderId'];

$sql_order_delete = "DELETE FROM ORDERS WHERE ORDER_ID = '$orderID'";
$result_order_delete = mysqli_query($conn, $sql_order_delete);

if ($result_order_delete) {
    echo 'Success';
}

?>
