<?php
include("mysql_connect.inc.php");

$sql_order_search = "SELECT * FROM ORDERS";
$result_order_search = mysqli_query($conn, $sql_order_search);

if (mysqli_num_rows($result_order_search) > 0) 
{
    $order = array();
    while ($row = mysqli_fetch_assoc($result_order_search)) {
      $order[] = $row;
    }
    echo json_encode($order);
}
else 
{
    echo json_encode(array('error' => mysqli_error($conn)));
}
?>