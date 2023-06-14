<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="css/manager.css">
<div class = "table-body">
<?php
include("mysql_connect.inc.php");

$orderQuery = "SELECT customer.cus_id AS cus_id, cus_name ,orders.ORDER_BOOK_AMOUNT AS book_amount, book.book_price AS book_price 
                FROM customer 
                Join orders on  customer.CUS_ID=orders.ORDER_CUS_ID
                Join book on  book.book_id=orders.ORDER_BOOK_ID;";
$orderResult = mysqli_query($conn, $orderQuery);

$summaryQuery = "SELECT  round(sum(orders.ORDER_BOOK_AMOUNT),0) AS total_amount, round(sum(orders.ORDER_BOOK_AMOUNT*book.book_price),2) AS payment
            FROM customer 
            Join orders on  customer.CUS_ID=orders.ORDER_CUS_ID
            Join book on  book.book_id=orders.ORDER_BOOK_ID;";
$summaryresult = mysqli_query($conn, $summaryQuery);

// 建立一個關聯陣列用於儲存book_id對應的book_price
// $bookPrices = array();
// while ($bookRow = mysqli_fetch_assoc($bookResult)) {
//   $bookPrices[$bookRow['book_id']] = $bookRow['book_price'];
  
// }
// $orderRow = mysqli_fetch_assoc($orderResult);
// echo $orderRow['cus_id'];
// 計算revenue並顯示在表格中
echo"<table class=\"table-content\">";
echo"<thead class=\"table-summary\">";
echo"<th>Order ID</th>";
          echo"<th>Customer's Name</th>";
          echo"<th>Purchase Amount</th>";
          echo"<th>Payment</th>";
    echo"</thead>";
echo "<tbody>";
// while ($orderRow = mysqli_fetch_assoc($orderResult)) {
//   $amount = $orderRow['amount'];
//   $bookId = $orderRow['book_id'];
//   $bookPrice = $bookPrices[$bookId];
//   $revenue = $amount * $bookPrice;
//   $bookname = $orderRow['cus_name'];

//   echo "<tr>";
//   echo "<td>{$orderRow['order_id']}</td>";
//   echo "<td>{$bookname}</td>";
//   echo "<td>{$amount}</td>";
//   echo "<td>{$revenue}</td>";
//   echo "</tr>";
// }
while ($orderRow = mysqli_fetch_assoc($orderResult)) {   
  echo "<tr>";
    echo "<td>{$orderRow['cus_id']}</td>";
    echo "<td>{$orderRow['cus_name']}</td>";
    echo "<td>{$orderRow['book_amount']}</td>";
    echo "<td>{$orderRow['book_price']}</td>";
  echo "</tr>";
}
echo "</tbody>";
echo"<thead>";
while($summaryrow = mysqli_fetch_assoc($summaryresult)){
  echo"<td></td>";
  echo"<td></td>";
  echo"<td>{$summaryrow['total_amount']}</td>";
  echo"<td>$ {$summaryrow['payment']}</td>";
};
echo"</thead>";
echo"</table>";
// 釋放資源
mysqli_free_result($orderResult);
mysqli_close($conn);

?>
</div>