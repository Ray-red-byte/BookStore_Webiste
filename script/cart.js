function Remove_book_fromorder(bookId) {
    return fetch('php/cart_remove.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookId: parseInt(bookId) })
    })
    .then(response => response.json());
}

function remove(event){
    //Remove from database
    const removebtn = event.target.closest(".remove-button");
    const row = event.target.closest('tr');
    
    const bookId = removebtn.dataset.id;
    Remove_book_fromorder(bookId)
    .then(details => {
        //Remove from table
        setTimeout(() => {
          row.remove();
          countTotalPrice();
        }, 500);
    })
    .catch(error => {
      //alert(error);
    });
}


function fetchBooks(books) {

  const tbody = document.getElementById("bookTable").querySelector("tbody");

  // Insert new rows
  books.forEach(book => {
    const row = tbody.insertRow();

    // Add a CSS class to the row for styling
    row.classList.add("row");

    const titleCell = row.insertCell();
    titleCell.innerHTML = book.BOOK_NAME;
    titleCell.style.textAlign = "left";
    titleCell.style.paddingLeft = "20px";

    const discountCell = row.insertCell();
    discountCell.innerHTML = (book.BOOK_DISCOUNT * 100).toFixed(0)  + "%";

    const containerDiv = document.createElement("div");
    const amountCell = row.insertCell();

    
    const inputElement = document.createElement("span");
    inputElement.name = "qty";
    inputElement.id = "qty";
    inputElement.textContent = "1";
    inputElement.classList.add("amount");

    const addElement = document.createElement("img");
    addElement.src = "image/add_cart.png";
    addElement.id = "add";
    addElement.classList.add("add-img");
    addElement.addEventListener('click', () => {
      let quantity = parseInt(inputElement.textContent);
      quantity++;
      if (quantity >= book.BOOK_AMOUNT){
        alert("Exceed Stock !");
      } else {
        inputElement.textContent = quantity;
        ADD_calculateTotalPrice(row);
        countTotalPrice();
      }
    });
    const minusElement = document.createElement("img");
    minusElement.src = "image/minus.png";
    minusElement.id = "minus";
    minusElement.classList.add("minus-img");
    minusElement.addEventListener('click', () => {
      let quantity = parseInt(inputElement.textContent);
      quantity--;
      if (quantity < 1) {
        alert("Do you want to Remove?");
      } else {
        inputElement.textContent = quantity;
        MINUS_calculateTotalPrice(row);
        countTotalPrice();
      }

    });

    containerDiv.appendChild(minusElement);
    containerDiv.appendChild(inputElement);
    containerDiv.appendChild(addElement);
    amountCell.appendChild(containerDiv);

    const totalpriceCell = row.insertCell();
    let total_price = (parseInt(inputElement.textContent) * (book.BOOK_PRICE * book.BOOK_DISCOUNT));
    totalpriceCell.innerHTML = "$" + total_price.toFixed(2);
    totalpriceCell.style.textAlign = "left";
    totalpriceCell.style.paddingLeft = "20px";

    const instockCell = row.insertCell();
    instockCell.innerHTML = book.BOOK_AMOUNT;
    
    const removeCell = row.insertCell();
    removeCell.innerHTML = `<button id="remove" class="remove-button" onclick="remove(event)" data-id="${book.BOOK_ID}">Remove</button>`;
  });
}

function ADD_calculateTotalPrice(row) {
  const inputElement = row.querySelector(".amount");
  const price = parseFloat(row.cells[3].innerHTML.substr(1));
  const quantity = parseInt(inputElement.textContent);
  const total_price = (price * (quantity)/(quantity-1)).toFixed(2);
  row.cells[3].innerHTML = "$" + total_price;
}

function MINUS_calculateTotalPrice(row) {
  const inputElement = row.querySelector(".amount");
  const price = parseFloat(row.cells[3].innerHTML.substr(1));
  const quantity = parseInt(inputElement.textContent);
  const total_price = (price * (quantity)/(quantity+1)).toFixed(2);
  row.cells[3].innerHTML = "$" + total_price;
}

function display_cart_books(){
    fetch('php/cart_show.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      setTimeout(() => {
        fetchBooks(result); 
        countTotalPrice();
      }, 10);
    })
    .catch(error => {
        console.log(error);
    });
}

function countTotalPrice(){
  const rows = document.getElementById("bookTable").querySelectorAll("tbody tr");
  let total_price = 0;
  rows.forEach(row => {
    const price = parseFloat(row.cells[3].innerHTML.substr(1));
    total_price += price;
  });
  
  // Update the display of the total price
  const totalPriceElement = document.getElementById("totalPrice-value");
  totalPriceElement.textContent = "$" + total_price.toFixed(2);
}

function redirectToInvoice() {
  // Get the total price and book amounts
  var totalPrice = document.getElementById("totalPrice-value").innerText;
  var bookAmounts = getBookAmounts(); // Implement your logic to get the book amounts

  // Construct the URL with the parameters
  var url = "invoice.html?totalPrice=" + encodeURIComponent(totalPrice) + "&bookAmounts=" + encodeURIComponent(bookAmounts);

  // Redirect to the Invoice page
  location.href = url;
}

function getBookAmounts() {
  const tbody = document.getElementById("bookTable").querySelector("tbody");
  const rows = tbody.getElementsByTagName("tr");
  const amounts = [];

  for (let i = 0; i < rows.length; i++) {
    const amountCell = rows[i].querySelector("td:nth-child(3)");
    const amount = parseInt(amountCell.textContent.trim());
    amounts.push(amount);
  }

  // Pass the amounts to the metric or use them as needed
  console.log("Book Amounts:", amounts);

  return amounts.join(","); // Example string format
}

function sendToInvoice(){
  redirectToInvoice();
}

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve and display books from the server
    display_cart_books(); 
    countTotalPrice();

});