<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
  <title>Finance Report</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,300&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="../css/report.css">
</head>
<?php
include("mysql_connect.inc.php");

$summaryQuery ="SELECT round(sum(order_book_amount* book_price),2) as ttl_rev, round(sum(order_book_amount * book_cost),2) as ttl_cost, round(sum(order_book_amount* book_price),2)-round(sum(order_book_amount* book_cost),2) as ttl_profit 
                FROM orders
                JOIN book on book.book_id=orders.order_book_id 
                JOIN customer on customer.cus_id=orders.order_cus_id";

$summaryresult = mysqli_query($conn, $summaryQuery);

$famousQuery = "SELECT count(book_id) as sold_amount, book_name, round(sum(book_price-book_cost),2) AS profit
                FROM orders 
                JOIN book on book.book_id=orders.order_book_id 
                JOIN customer on customer.cus_id=orders.order_cus_id
                GROUP BY book_name
                ORDER BY sold_amount DESC LIMIT 3";


$famousresult = mysqli_query($conn,$famousQuery);

echo"<body>";
    echo "<div class='middle-section'>";
        echo"<div class ='upper-section'>";
            echo"<div class = 'title'>Bestsellers</div>";
                echo"<table class=\"table-content\">";
                    echo"<thead class=\"table-summary\">";
                        echo"<tr>";
                            echo"<th>Top Selling</th>";
                            echo"<th>Book Name</th>";
                            echo"<th>Profit per book</th>";
                        echo"</tr>";
                    echo"</thead>";
                    echo "<tbody>";

                    $count = 1;
                    while ($famousRow = mysqli_fetch_assoc($famousresult)){
                        echo "<tr>";
                            echo"<td> {$count} </td>";
                            echo"<td> {$famousRow['book_name']} </td>";
                            echo"<td> {$famousRow['profit']} </td>";
                        echo "</tr>";
                        $count++;
                    }
                    echo"</tbody>";
                echo"</table>";
        echo"</div>";

        echo"<div class ='bottom-section'>";
            echo"<div class = 'title'>Finance Status</div>";
            $summaryRow = mysqli_fetch_assoc($summaryresult);
            echo"<div class = 'left-content'>Current Revenue</div>";
            echo"<div> $:{$summaryRow['ttl_rev']} </div>";
            echo"<div class = 'left-content'>Purchase Cost</div>";
            echo"<div> $:{$summaryRow['ttl_cost']} </div>";
            echo"<div class = 'left-content'>Overall Profit</div>";
            echo"<div> $:{$summaryRow['ttl_profit']} </div>";
        echo"</div>";
    echo"</div>";
echo"</body>";

// 釋放資源
mysqli_close($conn);
?>
