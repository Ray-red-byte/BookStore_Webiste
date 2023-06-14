<?php
include("mysql_connect.inc.php");

$cusvalue = (int)$_POST['input-value'];
$cuscolumName = $_POST['select-method'];
$cusname = $_POST['update-cus'];


$sql_cus_update = "UPDATE CUSTOMER SET $cuscolumName = '$cusvalue' WHERE CUS_ID = '$cusname'";
$result_cus_update = mysqli_query($conn, $sql_cus_update);

if ($result_cus_update) 
{
    echo '<meta http-equiv=REFRESH CONTENT=0.1;url=../manager.html>';
}
else 
{
    echo json_encode(array('info' => 'no'));
}
?>