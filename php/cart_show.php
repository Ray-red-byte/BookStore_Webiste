<?php session_start(); ?>
<?php
include("mysql_connect.inc.php");
$user_id = $_SESSION['user_id'];

$sql_cart_search = "SELECT * FROM BOOK WHERE BOOK_ID IN (SELECT CART_BOOK_ID FROM CART WHERE CART_CUS_ID = '$user_id') AND BOOK_AMOUNT > 0";
$result_cart_search = mysqli_query($conn, $sql_cart_search);

if (mysqli_num_rows($result_cart_search) > 0) 
{
    $books = array();
    while ($row = mysqli_fetch_assoc($result_cart_search)) {
      $books[] = $row;
    }
    echo json_encode($books);
}
else 
{
    echo json_encode(array('error' => mysqli_error($conn)));
}
?>