<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
include("mysql_connect.inc.php");

$username = $_POST['user'];
$fullname = $_POST['fullname'];
$pw = $_POST['pw'];
$pw2 = $_POST['repw'];
$email = $_POST['mail'];
$phone = $_POST['phone'];

$validation_sql = "SELECT ACCOUNT_NAME FROM ACCOUNT WHERE ACCOUNT_NAME = '$username'";
if(mysqli_num_rows(mysqli_query($conn, $validation_sql)) > 0){
	echo "<script>alert('Exist Account');</script>";
	echo '<meta http-equiv=REFRESH CONTENT=1;url=../register_customer.html>';
}
else
{
	//判斷帳號密碼是否為空值
	//確認密碼輸入的正確性
	if($username != null && $pw != null && $pw2 != null && $pw == $pw2)
	{
		//新增資料進資料庫語法
		$sql_insert_customer = "INSERT INTO  CUSTOMER (CUS_NAME, PHONE_NUMBER) VALUES ('$fullname', '$phone')";
		mysqli_query($conn, $sql_insert_customer);
		$sql_get_id = "SELECT * FROM CUSTOMER ORDER BY CUS_ID DESC LIMIT 1";
		$result = mysqli_query($conn, $sql_get_id);
		$row = mysqli_fetch_assoc($result);
		$lastInsertedCustomerId = $row['CUS_ID'];
		$sql_insert_account = "INSERT INTO  ACCOUNT (ACCOUNT_NAME, ACCOUNT_PASSWORD, CUS_ID) VALUES ('$username', '$pw', '$lastInsertedCustomerId')";
		
	
		if(mysqli_query($conn,$sql_insert_account))
		{
			echo "<script>alert('Register Success');</script>";
			echo '<meta http-equiv=REFRESH CONTENT=1;url=../login.html>';
		}
		else
		{
			echo "<script>alert('Register Fail');</script>";
			echo '<meta http-equiv=REFRESH CONTENT=1;url=../register_customer.html>';
		}
	}

	else
	{
		echo "<script>alert('Register Fail');</script>";
		echo '<meta http-equiv=REFRESH CONTENT=1;url=../register_customer.html>';
	}
}
?>
