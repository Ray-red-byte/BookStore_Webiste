<?php session_start(); ?>
<?php
include("mysql_connect.inc.php");

$user_id = $_SESSION['user_id'];
$cusvalue = $_POST['input-value'];
$cuscolumName = $_POST['select-method'];

if ($cuscolumName == 'Account_Name' || $cuscolumName == 'account_Password'){
    $sql_cus_update = "UPDATE ACCOUNT SET $cuscolumName = '$cusvalue' WHERE CUS_ID = '$user_id'";
    $result_cus_update = mysqli_query($conn, $sql_cus_update);
} else if ($cuscolumName == 'Cus_Name' || $cuscolumName == 'Phone_Number') {
    $sql_cus_update = "UPDATE CUSTOMER SET $cuscolumName = '$cusvalue' WHERE CUS_ID = '$user_id'";
    $result_cus_update = mysqli_query($conn, $sql_cus_update);
}

if ($result_cus_update) 
{
    echo '<meta http-equiv=REFRESH CONTENT=0.5;url=../membership.html>';
}
else 
{
    echo json_encode(array('info' => 'no'));
}
?>