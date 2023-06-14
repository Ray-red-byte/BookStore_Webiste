<?php
include("mysql_connect.inc.php");

$json = file_get_contents("php://input");
$object = json_decode($json, true);
$bookID = mysqli_real_escape_string($conn, $object['bookId']);

$sql_book_detail = "SELECT * FROM BOOK WHERE BOOK_ID = '$bookID'";
$result_detail = mysqli_query($conn, $sql_book_detail);

if ($result_detail) {
    $books = array();
    while ($row = mysqli_fetch_assoc($result_detail)) {
        $books[] = $row;
    }
    echo json_encode($books);
} else {
    echo json_encode(array('error' => 'Failed to retrieve books.'));
}
?>
