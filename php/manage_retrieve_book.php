<?php
include("mysql_connect.inc.php");

$sql_book_search = "SELECT * FROM BOOK";
$result_book_search = mysqli_query($conn, $sql_book_search);

if (mysqli_num_rows($result_book_search) > 0) 
{
    $books = array();
    while ($row = mysqli_fetch_assoc($result_book_search)) {
      $books[] = $row;
    }
    echo json_encode($books);
}
else 
{
    echo json_encode(array('error' => mysqli_error($conn)));
}
?>