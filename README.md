# Bookstore Website
## 1.Introduction
This website is a project that contain basic functions about how a bookstore website work. 

#### Customer side 
 1. Login, Logout, Register System
 2. Search for book
 3. Cart
 4. Invoice
 5. Edit customer information
 6. Edit customer's invoice information

#### Manager side
 1. Check, Update Inventory
 2. Check, Update Invoice
 3. Check, Update Customer information
 4. Check Finance status

## 2.Language & Environment Setup
 1. HTML, CSS, Javascript, php, SQL
 2. MAMP to connect Database
 3. Faker package to generate fake books

## 3.ERD Diagram
   Construct the ERD Diagtam to clearly show the relationship with each component.
![ERD Diagram](demo_img/ERD.png)

## 4.Demo
#### Login:
![Login](demo_img/login.png)
 1. If you enter the wrong password or have not register yet, it will alert
 2. If you left the unfill blank, it will alert
#### Register & Register Manager:
![Login](demo_img/register.png)
 1. If you use account name same as another user, it will alert
 2. If you left the unfill blank, it will alert
#### BookStore MainPage
![Screen Shot 2023-10-17 at 14 47 50](https://github.com/Ray-red-byte/BookStore_Webiste/assets/72739609/f17809e9-05da-428b-b9a4-ffc789043d95)
tore main page:

 1. Filter: It can change the the search result based on your Publication Year, Price
 2. Search button: It can change the the search result based on your Author, Bookname
 3. Detail: click the icon can show more detail of the book , such as price, amount...
 4. Add to cart: It will increase the number on cart icon in navbar
 5. logout icon: If logout and login again, the record still remain the same
 6. Invoice record: It show the book customer buy and detail
    ![Customer Invoice](demo_img/cus_invoice.png)
 7. Customer information: It allow customer to change informatin
    ![Customer Information](demo_img/cus_info.png)


#### Cart page:
  1. Amount of book: Choose what number of books to select
  2. Remove: Remove the book
     ![Screen Shot 2023-06-13 at 10 04 57](https://github.com/Ray-red-byte/BookStore_Webiste/assets/72739609/9e19b49d-eae1-4aa6-9d0e-71fefba20398)

#### Checkout page:
   1. Payment Method: Credit Card / Bank Transfer
   2. Shipping Method: Standard / Express
   3. Invoice Method: email / mail
   4. Address
      ![Screen Shot 2023-09-18 at 15 58 32](https://github.com/Ray-red-byte/BookStore_Webiste/assets/72739609/5cebb0f1-39c3-4617-99ab-3034210a4174)

#### Invoice page:
    Shopping detail of the name / amount / invoice / date ... of books  
![Screen Shot 2023-09-18 at 16 03 08](https://github.com/Ray-red-byte/BookStore_Webiste/assets/72739609/2914a9b7-75ed-4e44-871f-f55d60c9b861)

#### Customer Information
    Can update customer name / password /phone number
    ![Screen Shot 2023-09-18 at 16 03 08](https://github.com/Ray-red-byte/BookStore_Webiste/assets/72739609/0690d587-62ed-4f07-be4c-3dfaf71a913e)

#### Manager main page
    1. Invoice check: Check each customer's invoice, can remove, update information
    2. Inventory check: Check the book remain in the store, can remove, update information
    3. Customer check: Ckeck customer status, can remove, update VIP / Coupon
       ![Screen Shot 2023-09-18 at 16 03 08](https://github.com/Ray-red-byte/BookStore_Webiste/assets/72739609/2a6021fd-4b8b-43dd-b005-0c732bb4875b)

    4. Finance check: Show the Top selling, current finance status
       ![Screen Shot 2023-09-18 at 16 03 08](https://github.com/Ray-red-byte/BookStore_Webiste/assets/72739609/4a1ba8a1-9663-48c3-a42e-641fa30a23cd)



    


