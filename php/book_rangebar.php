<?php
include("mysql_connect.inc.php");
$json = file_get_contents("php://input");
$object = json_decode($json, true);
$yearLeft = (int)$object['yearLeft'];
$yearRight = (int)$object['yearRight'];
$priceLeft = (float)['priceLeft'];
$priceRight = (float)$object['priceRight'];

$sql_book_rangebar = "SELECT * FROM BOOK WHERE BOOK_AMOUNT > 0 AND BOOK_PRICE BETWEEN '$priceLeft' AND '$priceRight' AND CAST(BOOK_YEAR_OF_PUBLCATION AS UNSIGNED) BETWEEN '$yearLeft' AND '$yearRight'";
$result_range_bar = mysqli_query($conn, $sql_book_rangebar);

if ($result_range_bar) 
{
    $books = array();
    while ($row = mysqli_fetch_assoc($result_range_bar)) {
      $books[] = $row;
    }
    echo json_encode($books);
}
else 
{
    
    echo json_encode(array('error' => 'Failed to retrieve books.'));
}
?>