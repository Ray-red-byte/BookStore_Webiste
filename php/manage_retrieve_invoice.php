<?php
include("mysql_connect.inc.php");

$sql_invoice_search = "SELECT * FROM INVOICE";
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