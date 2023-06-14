<?php
include("mysql_connect.inc.php");
$json = file_get_contents("php://input");
$object = json_decode($json, true);
$bookname = mysqli_real_escape_string($conn, $object['bookname']);
$bookauthor = mysqli_real_escape_string($conn, $object['author']);

$sql_book_search = "SELECT * FROM BOOK 
                    WHERE (BOOK_NAME = '$bookname'
                    OR BOOK_AUTHOR = '$bookauthor') AND BOOK_AMOUNT > 0 ";

$result_search = mysqli_query($conn, $sql_book_search);

if (mysqli_num_rows($result_search) > 0) 
{
    $books = array();
    while ($row = mysqli_fetch_assoc($result_search)) {
      $books[] = $row;
    }
    echo json_encode($books);
}
else 
{
    echo json_encode(array('error' => mysqli_error($conn)));
}
?>