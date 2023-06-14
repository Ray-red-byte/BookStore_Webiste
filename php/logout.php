<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<?php
include("mysql_connect.inc.php");
$_SESSION['username'] = null;
echo '<meta http-equiv=REFRESH CONTENT=1;url=../login.html>';
?>