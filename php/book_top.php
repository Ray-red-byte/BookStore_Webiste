<?php
include("mysql_connect.inc.php");
$sql_book_search_top = "SELECT * FROM BOOK WHERE BOOK_AMOUNT > 0 LIMIT 10";

$result_search = mysqli_query($conn, $sql_book_search_top);

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