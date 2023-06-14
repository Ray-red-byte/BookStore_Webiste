<?php
$db_server = "localhost";

$db_name = "Final_project";

$db_user = "Ray";

$db_passwd = "2827ABcd";

//對資料庫連線
$conn = new mysqli ($db_server, $db_user, $db_passwd);
if(!@mysqli_connect($db_server, $db_user, $db_passwd))
	die("無法對資料庫連線");

//資料庫連線採UTF8
mysqli_query($conn, "SET NAMES utf8");

//選擇資料庫
if(!@mysqli_select_db($conn,$db_name))
	die("無法使用資料庫");
?>
