<?php session_start(); ?>
<?php

$user_id = $_SESSION['user_id'];
include("mysql_connect.inc.php");

$sql_cus_search = "SELECT ACCOUNT.ACCOUNT_NAME AS ACCOUNT_NAME, ACCOUNT.ACCOUNT_PASSWORD AS ACCOUNT_PASSWORD, CUSTOMER.CUS_NAME AS CUS_NAME, CUSTOMER.PHONE_NUMBER AS PHONE_NUMBER, CUSTOMER.COUPON AS COUPON, CUSTOMER.VIP AS VIP 
                   FROM CUSTOMER JOIN ACCOUNT USING(CUS_ID)
                   WHERE CUS_ID = '$user_id'";
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