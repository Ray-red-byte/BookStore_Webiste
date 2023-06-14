<?php
include("mysql_connect.inc.php");

$sql_cus_search = "SELECT * FROM CUSTOMER";
$result_cus_search = mysqli_query($conn, $sql_cus_search);

if (mysqli_num_rows($result_cus_search) > 0) 
{
    $cus = array();
    while ($row = mysqli_fetch_assoc($result_cus_search)) {
      $cus[] = $row;
    }
    echo json_encode($cus);
}
else 
{
    echo json_encode(array('error' => mysqli_error($conn)));
}
?>