<?php session_start(); ?>
<?php
include("mysql_connect.inc.php");
$user_id = (int)$_SESSION['user_id'];
$sql_num_notification = "SELECT * FROM CART WHERE CART_CUS_ID = '$user_id'";
$result_num_notification = mysqli_query($conn, $sql_num_notification);

if ($result_num_notification){
    $result_num = mysqli_num_rows($result_num_notification);
    echo json_encode($result_num);
}
else
{
    echo json_encode(array('error' => mysqli_error($conn)));
}
?>