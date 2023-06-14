<?php
include("mysql_connect.inc.php");

$invoicevalue = $_POST['input-value'];
$invoicecolumName = $_POST['select-method'];
$invoicename = (int)$_POST['update-invoice'];

if ($invoicecolumName == 'Pay Method'){
    $invoicecolumName = 'INV_PAYMENT_METHOD';
} 
if ($invoicecolumName == 'Invoice Method'){
    $invoicecolumName = 'INV_METHOD';
} 
if ($invoicecolumName == 'Ship Method'){
    $invoicecolumName = 'INV_SHIP_METHOD';
} 
if ($invoicecolumName == 'Pick Location'){
    $invoicecolumName = 'INV_ADDRESS';
} 

$sql_invoice_update = "UPDATE INVOICE SET $invoicecolumName = '$invoicevalue' WHERE INV_ID = '$invoicename'";
$result_invoice_update = mysqli_query($conn, $sql_invoice_update);

if ($result_invoice_update) 
{
    echo '<meta http-equiv=REFRESH CONTENT=0.1;url=../manager.html>';
}
else 
{
    echo json_encode(array('info' => 'no'));
}
?>