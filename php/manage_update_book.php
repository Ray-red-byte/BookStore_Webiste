<?php
include("mysql_connect.inc.php");

$bookvalue = $_POST['input-value'];
$bookcolumName = $_POST['select-method'];
$bookname = $_POST['update-bookname'];

if ($bookcolumName == 'Edition'){
    $bookvalue = (int)$bookvalue;
    $bookcolumName = 'BOOK_EDITION';
} 
if ($bookcolumName == 'Amount'){
    $bookvalue = (int)$bookvalue;
    $bookcolumName = 'BOOK_AMOUNT';
} 
if ($bookcolumName == 'Discount'){
    $bookvalue = (float)$bookvalue;
    $bookcolumName = 'BOOK_DISCOUNT';
} 
if ($bookcolumName == 'Price'){
    $bookvalue = (float)$bookvalue;
    $bookcolumName = 'BOOK_PRICE';
}
echo $bookcolumName;

$sql_book_update = "UPDATE BOOK SET $bookcolumName = '$bookvalue' WHERE BOOK_NAME = '$bookname'";
$result_book_update = mysqli_query($conn, $sql_book_update);

if ($result_book_update) 
{
    echo '<meta http-equiv=REFRESH CONTENT=0.1;url=../manager.html>';
}
else 
{
    echo json_encode(array('info' => 'no'));
}
?>