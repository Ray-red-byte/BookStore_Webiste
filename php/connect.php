<?php session_start(); ?>
<!--上方語法為啟用session，此語法要放在網頁最前方 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<?php
//連接資料庫
//只要此頁面上有用到連接 MySQL就要include它
include("mysql_connect.inc.php");
$user = $_POST['user'];
$pw = $_POST['pw'];

//搜尋資料庫資料
$sql = "SELECT * FROM ACCOUNT where ACCOUNT_NAME = '$user'";
$result = mysqli_query($conn,$sql);
$row = @mysqli_fetch_row($result);
	
//判斷帳號與密碼是否為空白
//以及MySQL資料庫裡是否有這個會員
if($user != null && $pw != null && $row[1] == $user && $row[2] == $pw)
{
	//將帳號寫入session，方便驗證使用者身份
	$_SESSION['user_id'] = $row[3];
	$_SESSION['username'] = $user;

	//if user is customer, direct to bookstore
	//if user is manager, direct to control center
	if ($row[3] != null){
		echo "<script>alert('Success');</script>";
		echo '<meta http-equiv=REFRESH CONTENT=1;url=../bookstore.html>';
	} else {
		echo "<script>alert('Success');</script>";
		echo '<meta http-equiv=REFRESH CONTENT=1;url=../manager.html>';
	}
	
}
else
{
	echo "<script>alert('Fail');</script>";
	echo '<meta http-equiv=REFRESH CONTENT=1;url=../login.html>';
}
?>
