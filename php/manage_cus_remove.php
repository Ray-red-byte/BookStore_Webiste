<?php
include("mysql_connect.inc.php");

$json = file_get_contents("php://input");
$object = json_decode($json, true);
$cusID = (int)$object['cusId'];

$sql_delete_account = "DELETE FROM ACCOUNT WHERE CUS_ID = '$cusID'";
$result_delete_account = mysqli_query($conn, $sql_delete_account);

$sql_cus_delete = "DELETE FROM CUSTOMER WHERE CUS_ID = '$cusID'";
$result_cus_delete = mysqli_query($conn, $sql_cus_delete);

if (!$result_cus_delete && !$result_delete_account) {
    echo json_encode(array('error' => 'Failed to retrieve cuss.'));
}
else
{
    echo json_encode(array('error' => 'Failed to retrieve cuss.'));
}

?>
