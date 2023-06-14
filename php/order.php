<?php session_start(); ?>
<?php
include("mysql_connect.inc.php");

$json = file_get_contents("php://input");
$object = json_decode($json, true);
$bookID = mysqli_real_escape_string($conn, $object['bookId']);
$user_id = (int)$_SESSION['user_id'];

$sql_check = "SELECT * FROM CART WHERE CART_BOOK_ID = '$bookID' AND CART_CUS_ID = '$user_id'";
$result_check = mysqli_query($conn, $sql_check);

//echo $result_check;
if (mysqli_num_rows($result_check) == 0){
    
    $sql_insert_cart = "INSERT INTO CART (CART_BOOK_ID, CART_CUS_ID) VALUES ('$bookID', '$user_id')";
    $result_insert_cart = mysqli_query($conn, $sql_insert_cart);
    if ($result_insert_cart) {
        echo json_encode(array('success' => true));

    } else {
        echo json_encode(array('error' => 'Failed to insert order.'));
    }
}
else{
    echo "<script>alert('You already choose this book');</script>";
    echo json_encode(array('error' => 'Failed to insert order.'));
}
?>
