<?php
require_once 'vendor/autoload.php';
$faker = Faker\Factory::create();

// Establish database connection
include("mysql_connect.inc.php");
for ($i = 0; $i < 5; $i++) {
  $bookName = $faker->sentence(2); // Generate a random book name
  $bookAuthor = $faker->name; // Generate a random author name
  $bookYear = $faker->numberBetween(1983, 2023); // Generate a random year of publication
  $bookEdition = $faker->numberBetween(1, 20);; // Generate a random edition
  $bookDiscount = $faker->randomFloat(2, 0.5, 0.95);
  $bookAmount = $faker->numberBetween(1, 100); // Generate a random amount of books
  $bookPrice = $faker->randomFloat(2, 2000, 4000); // Generate a random price
  $bookCost =  $faker->randomFloat(2, 300, 1000); // Calculate the cost based on the amount and price

  $sql = "INSERT INTO BOOK (BOOK_NAME, BOOK_AUTHOR, BOOK_YEAR_OF_PUBLCATION, BOOK_EDITION, BOOK_DISCOUNT, BOOK_AMOUNT, BOOK_PRICE, BOOK_COST) VALUES ('$bookName', '$bookAuthor', '$bookYear', '$bookEdition', '$bookDiscount', '$bookAmount', '$bookPrice', '$bookCost')";
  mysqli_query($conn, $sql);
}

echo '<meta http-equiv=REFRESH CONTENT=5;url=../fake.html>';
?>
