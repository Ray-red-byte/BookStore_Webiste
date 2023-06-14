//-----------------------Inventory------------------------
function Remove_book_fromorder(bookId) {
    return fetch('php/manage_book_remove.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookId: parseInt(bookId) })
    })
    .then(response => response.json());
}
function remove_book(event){
    //Remove from database
    const removebtn = event.target.closest(".remove-button");
    const row = event.target.closest('tr');
    
    const bookId = removebtn.dataset.id;
    Remove_book_fromorder(bookId)
    .then(details => {
      row.remove();
    })
    .catch(error => {
      //alert(error);
    });
}
function fetchBooks(books) {
  if (tbody){
    while (tbody.rows.length > 0) {
      tbody.deleteRow(0);
    }
  }
  // Create the table element
  var table = document.createElement('table');
  table.id = 'bookTable';
  table.classList.add('result-table');

  // Create the table header
  var thead = document.createElement('thead');
  var headerRow = document.createElement('tr');
  var headers = ['Book Name', 'Edition', 'In Stock', 'Price', 'Discount', 'Remove'];

  headers.forEach(function(headerText) {
    var th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement('tbody');
  tbody.id = 'result';

  table.appendChild(tbody);

  // Append the table to the desired container element
  var tableContainer = document.getElementById('tableContainer');
  tableContainer.appendChild(table);

  if (!tbody) {
    console.error("Tbody element not found");
    return;
  }
    // Insert new rows
    books.forEach(book => {
      console.log()
      const row = tbody.insertRow();
  
      // Add a CSS class to the row for styling
      row.classList.add("row");
  
      const titleCell = row.insertCell();
      titleCell.innerHTML = book.BOOK_NAME;
      titleCell.style.textAlign = "left";
      titleCell.style.paddingLeft = "20px";

      const editionCell = row.insertCell();
      editionCell.innerHTML = book.BOOK_EDITION;
      editionCell.style.textAlign = "left";
      editionCell.style.paddingLeft = "20px";
  
      const containerDiv = document.createElement("div");
      const amountCell = row.insertCell();
      const inputElement = document.createElement("span");
      inputElement.name = "qty";
      inputElement.id = "qty";
      if (book.BOOK_AMOUNT < 0){
        book.BOOK_AMOUNT = 'Out of Stock';
      }
      inputElement.textContent = book.BOOK_AMOUNT;
      inputElement.classList.add("amount");

      containerDiv.appendChild(inputElement);
      amountCell.appendChild(containerDiv);

      const priceCell = row.insertCell();
      const bookPrice = parseFloat(book.BOOK_PRICE);
      priceCell.innerHTML = "$" + bookPrice.toFixed(2);
      priceCell.style.textAlign = "left";
      priceCell.style.paddingLeft = "20px";

      const discountCell = row.insertCell();
      discountCell.innerHTML = (book.BOOK_DISCOUNT * 100).toFixed(0)  + "%";
  
      const removeCell = row.insertCell();
      removeCell.innerHTML = `<button id="remove" class="remove-button" onclick="remove_book(event)" data-id="${book.BOOK_ID}">Remove</button>`;
    });
  optionBookInput();
}
function showInventory(){
    fetch('php/manage_retrieve_book.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
        fetchBooks(result);
    })
    .catch(error => {
        console.log(error);
    });
}
function optionBookInput(){
  var updateForm = document.getElementById("update-form");
  updateForm.setAttribute("action", "php/manage_update_book.php");

  //Get update-section
  var updateSection = document.getElementById("update-section");

  // Create the input element for BookName
  var bookNameInput = document.createElement("input");
  bookNameInput.id = "update-bookname";
  bookNameInput.name = "update-bookname";
  bookNameInput.placeholder = "BookName";
  bookNameInput.className = "update-bookname";

  // Create the select element for the dropdown
  var selectMethodDropdown = document.createElement("select");
  selectMethodDropdown.id = "select-method";
  selectMethodDropdown.name = "select-method";
  selectMethodDropdown.className = "dropdown";

  // Create the options for the dropdown
  var options = ["Edition", "Amount", "Price", "Discount"];
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i];
    option.text = options[i];
    selectMethodDropdown.appendChild(option);
  }

  // Create the container div
  var inputContainerDiv = document.createElement("div");
  inputContainerDiv.id = "input-container";

  // Append the input and select elements to the container div
  inputContainerDiv.appendChild(bookNameInput);
  inputContainerDiv.appendChild(selectMethodDropdown);
  updateSection.appendChild(inputContainerDiv);

  const dropdown = document.getElementById("select-method");
  const inputContainer = document.getElementById("input-container");
  const inputUpdate = document.createElement("input");
  inputUpdate.id = 'input-value';
  inputUpdate.name = 'input-value';
  inputUpdate.className = 'input-value';

  //Create Button
  const inputbutton = document.createElement("button");
  inputbutton.type="submit";
  inputbutton.className = "update-button";
  inputbutton.textContent = "Update";

  dropdown.addEventListener("change", function() {
    inputUpdate.type = "text";
    // Append the inputUpdate element to the inputContainer
    inputContainer.appendChild(inputUpdate);
    inputContainer.appendChild(inputbutton);
  });
}

//-----------------------Invoice----------------------------
function Remove_invoice_fromorder(invoiceId) {
  return fetch('php/manage_invoice_remove.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ invoiceId: parseInt(invoiceId) })
  })
  .then(response => response.json());
}
function remove_inv(event){
  //Remove from database
  const removebtn = event.target.closest(".remove-button");
  const row = event.target.closest('tr');
  
  const invoiceId = removebtn.dataset.id;
  Remove_invoice_fromorder(invoiceId)
  .then(details => {
    row.remove();
  })
  .catch(error => {
    //alert(error);
  });
}
function fetchInvoices(invoices) {
  // Create the table element
  var table = document.createElement('table');
  table.id = 'invoiceTable';
  table.classList.add('result-table');

  // Create the table header
  var thead = document.createElement('thead');
  var headerRow = document.createElement('tr');
  var headers = ['Invoice ID', 'Customer', 'Payment Method', 'Invoice Method', 'Ship Method', 'Address', 'Date', 'Total Price', 'Remove'];

  headers.forEach(function(headerText) {
    var th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement('tbody');
  tbody.id = 'result';

  table.appendChild(tbody);

  // Append the table to the desired container element
  var tableContainer = document.getElementById('tableContainer');
  tableContainer.appendChild(table);

  if (!tbody) {
    console.error("Tbody element not found");
    return;
  }
    // Insert new rows
    invoices.forEach(invoice => {
      const row = tbody.insertRow();
  
      // Add a CSS class to the row for styling
      row.classList.add("row");
  
      const titleCell = row.insertCell();
      titleCell.innerHTML = invoice.INV_ID;
      titleCell.style.textAlign = "left";
      titleCell.style.paddingLeft = "20px";

      const cusCell = row.insertCell();
      cusCell.innerHTML = invoice.INV_CUS_ID;
      cusCell.style.textAlign = "left";
      cusCell.style.paddingLeft = "20px";

      const paymethodCell = row.insertCell();
      paymethodCell.innerHTML = invoice.INV_PAYMENT_METHOD;
      paymethodCell.style.textAlign = "left";
      paymethodCell.style.paddingLeft = "20px";

      const invmethodCell = row.insertCell();
      invmethodCell.innerHTML = invoice.INV_METHOD;
      invmethodCell.style.textAlign = "left";
      invmethodCell.style.paddingLeft = "20px";

      const shipmethodCell = row.insertCell();
      shipmethodCell.innerHTML = invoice.INV_SHIP_METHOD;
      shipmethodCell.style.textAlign = "left";
      shipmethodCell.style.paddingLeft = "20px";
      
      const addressCell = row.insertCell();
      addressCell.innerHTML = invoice.INV_ADDRESS;
      addressCell.style.textAlign = "left";
      addressCell.style.paddingLeft = "20px";

      const dateCell = row.insertCell();
      dateCell.innerHTML = invoice.INV_DATE;
      dateCell.style.textAlign = "left";
      dateCell.style.paddingLeft = "20px";

      const priceCell = row.insertCell();
      const invoicePrice = parseFloat(invoice.INV_PRICE);
      priceCell.innerHTML = "$" + invoicePrice.toFixed(2);
      priceCell.style.textAlign = "left";
      priceCell.style.paddingLeft = "20px";
  
      const removeCell = row.insertCell();
      removeCell.innerHTML = `<button id="remove" class="remove-button" onclick="remove_inv(event)" data-id="${invoice.INV_ID}">Remove</button>`;
    });
  optionInvoiceInput();
}
function showInvoices(){
    fetch('php/manage_retrieve_invoice.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      if(result['error'] === "no"){
        alert("No Invoice yet");
      } else {
        fetchInvoices(result);
      }
    })
    .catch(error => {
        console.log(error);
    });
}
function optionInvoiceInput(){
  var updateForm = document.getElementById("update-form");
  updateForm.setAttribute("action", "php/manage_update_invoice.php");

  //Get update-section
  var updateSection = document.getElementById("update-section");

  // Create the input element for BookName
  var InvoiceInput = document.createElement("input");
  InvoiceInput.id = "update-invoice";
  InvoiceInput.name = "update-invoice";
  InvoiceInput.className = 'update-invoice';
  InvoiceInput.placeholder = "Invoice ID";

  // Create the select element for the dropdown
  var selectMethodDropdown = document.createElement("select");
  selectMethodDropdown.id = "select-method";
  selectMethodDropdown.name = "select-method";
  selectMethodDropdown.className = "dropdown";

  // Create the options for the dropdown
  var options = ["Pay Method", "Invoice Method", "Ship Method", "Pick Location"];
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i];
    option.text = options[i];
    selectMethodDropdown.appendChild(option);
  }

  // Create the container div
  var inputContainerDiv = document.createElement("div");
  inputContainerDiv.id = "input-container";

  // Append the input and select elements to the container div
  inputContainerDiv.appendChild(InvoiceInput);
  inputContainerDiv.appendChild(selectMethodDropdown);
  updateSection.appendChild(inputContainerDiv);

  const dropdown = document.getElementById("select-method");
  const inputContainer = document.getElementById("input-container");
  const inputUpdate = document.createElement("input");
  inputUpdate.id = 'input-value';
  inputUpdate.name = 'input-value';
  inputUpdate.className = 'input-value';

  const inputbutton = document.createElement("button");
  inputbutton.type="submit";
  inputbutton.className = "update-button";
  inputbutton.textContent = "Update";

  dropdown.addEventListener("change", function() {
    inputUpdate.type = "text";
    // Append the inputUpdate element to the inputContainer
    inputContainer.appendChild(inputUpdate);
    inputContainer.appendChild(inputbutton);
  });
}

//-----------------------Customer----------------------------
function Remove_cus_fromorder(cusId) {
  return fetch('php/manage_cus_remove.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cusId: parseInt(cusId) })
  })
  .then(response => response.json());
}
function remove_cus(event){
  //Remove from database
  const removebtn = event.target.closest(".remove-button");
  const row = event.target.closest('tr');
  
  const cusId = removebtn.dataset.id;
  Remove_cus_fromorder(cusId)
  .then(details => {
    row.remove();
  })
  .catch(error => {
    //alert(error);
  });
}
function fetchCustomers(customers) {
  // Create the table element
  var table = document.createElement('table');
  table.id = 'cusTable';
  table.classList.add('result-table');

  // Create the table header
  var thead = document.createElement('thead');
  var headerRow = document.createElement('tr');
  var headers = ['ID', 'Customer', 'Phone Number', 'Coupon', 'VIP', 'Remove'];

  headers.forEach(function(headerText) {
    var th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement('tbody');
  tbody.id = 'result';

  table.appendChild(tbody);

  // Append the table to the desired container element
  var tableContainer = document.getElementById('tableContainer');
  tableContainer.appendChild(table);

  if (!tbody) {
    console.error("Tbody element not found");
    return;
  }
    // Insert new rows
    customers.forEach(customer => {
      const row = tbody.insertRow();
  
      // Add a CSS class to the row for styling
      row.classList.add("row");
  
      const titleCell = row.insertCell();
      titleCell.innerHTML = customer.CUS_ID;
      titleCell.style.textAlign = "left";
      titleCell.style.paddingLeft = "20px";

      const cusCell = row.insertCell();
      cusCell.innerHTML = customer.CUS_NAME;
      cusCell.style.textAlign = "left";
      cusCell.style.paddingLeft = "20px";

      const phoneCell = row.insertCell();
      phoneCell.innerHTML = customer.PHONE_NUMBER;
      phoneCell.style.textAlign = "left";
      phoneCell.style.paddingLeft = "20px";

      const couponCell = row.insertCell();
      if (!customer.COUPON){
        customer.COUPON = 0;
      }
      couponCell.innerHTML = customer.COUPON;
      couponCell.style.textAlign = "left";
      couponCell.style.paddingLeft = "20px";

      const vipCell = row.insertCell();
      if (!customer.VIP){
        customer.VIP = 'No';
      } else {
        customer.VIP = 'Yes';
      }
      vipCell.innerHTML = customer.VIP;
      vipCell.style.textAlign = "left";
      vipCell.style.paddingLeft = "20px";
  
      const removeCell = row.insertCell();
      removeCell.innerHTML = `<button id="remove" class="remove-button" onclick="remove_cus(event)" data-id="${customer.CUS_ID}">Remove</button>`;
    });
  optionCusInput();
}
function showCustomers(){
  console.log(123);
    fetch('php/manage_retrieve_cus.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      if(result['error'] === "no"){
        alert("No Customers yet");
      } else {
        fetchCustomers(result);
      }
    })
    .catch(error => {
        console.log(error);
    });
}
function optionCusInput(){
  var updateForm = document.getElementById("update-form");
  updateForm.setAttribute("action", "php/manage_update_cus.php");

  //Get update-section
  var updateSection = document.getElementById("update-section");

  // Create the input element for BookName
  var cusInput = document.createElement("input");
  cusInput.id = "update-cus";
  cusInput.name = "update-cus";
  cusInput.placeholder = "CUS ID";
  cusInput.className = "update-cus";

  // Create the select element for the dropdown
  var selectMethodDropdown = document.createElement("select");
  selectMethodDropdown.id = "select-method";
  selectMethodDropdown.name = "select-method";
  selectMethodDropdown.className = "dropdown";

  // Create the options for the dropdown
  var options = ['Coupon', 'VIP'];
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i];
    option.text = options[i];
    selectMethodDropdown.appendChild(option);
  }

  // Create the container div
  var inputContainerDiv = document.createElement("div");
  inputContainerDiv.id = "input-container";

  // Append the input and select elements to the container div
  inputContainerDiv.appendChild(cusInput);
  inputContainerDiv.appendChild(selectMethodDropdown);
  updateSection.appendChild(inputContainerDiv);

  const dropdown = document.getElementById("select-method");
  const inputContainer = document.getElementById("input-container");
  const inputUpdate = document.createElement("input");
  inputUpdate.id = 'input-value';
  inputUpdate.name = 'input-value';
  inputUpdate.className = 'input-value';

  const inputbutton = document.createElement("button");
  inputbutton.type="submit";
  inputbutton.className = "update-button";
  inputbutton.textContent = "Update";

  dropdown.addEventListener("change", function() {
    inputUpdate.type = "text";
    // Append the inputUpdate element to the inputContainer
    inputContainer.appendChild(inputUpdate);
    inputContainer.appendChild(inputbutton);
  });
}

//-----------------------Order----------------------------
function Remove_order_fromorder(orderId) {
  return fetch('php/manage_order_remove.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ orderId: parseInt(orderId) })
  })
  .then(response => response.json());
}
function remove_order(event){
  //Remove from database
  const removebtn = event.target.closest(".remove-button");
  const row = event.target.closest('tr');
  
  const orderId = removebtn.dataset.id;
  Remove_order_fromorder(orderId)
  .then(details => {
    row.remove();
  })
  .catch(error => {
    //alert(error);
  });
}
function fetchOrders(orders) {
  // Create the table element
  var table = document.createElement('table');
  table.id = 'orderTable';
  table.classList.add('result-table');

  // Create the table header
  var thead = document.createElement('thead');
  var headerRow = document.createElement('tr');
  var headers = ['CUS ID', 'INV ID', 'BOOK ID', 'BOOK AMOUNT', 'Remove'];

  headers.forEach(function(headerText) {
    var th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement('tbody');
  tbody.id = 'result';

  table.appendChild(tbody);

  // Append the table to the desired container element
  var tableContainer = document.getElementById('tableContainer');
  tableContainer.appendChild(table);

  if (!tbody) {
    console.error("Tbody element not found");
    return;
  }
    // Insert new rows
    orders.forEach(order => {
      const row = tbody.insertRow();
  
      // Add a CSS class to the row for styling
      row.classList.add("row");
  
      const titleCell = row.insertCell();
      titleCell.innerHTML = order.ORDER_CUS_ID;
      titleCell.style.textAlign = "left";
      titleCell.style.paddingLeft = "20px";

      const orderCell = row.insertCell();
      orderCell.innerHTML = order.ORDER_INV_ID;
      orderCell.style.textAlign = "left";
      orderCell.style.paddingLeft = "20px";

      const orderbookCell = row.insertCell();
      orderbookCell.innerHTML = order.ORDER_BOOK_ID;
      orderbookCell.style.textAlign = "left";
      orderbookCell.style.paddingLeft = "20px";

      const orderbookamountCell = row.insertCell();
      orderbookamountCell.innerHTML = order.ORDER_BOOK_AMOUNT;
      orderbookamountCell.style.textAlign = "left";
      orderbookamountCell.style.paddingLeft = "20px";
  
      const removeCell = row.insertCell();
      removeCell.innerHTML = `<button id="remove" class="remove-button" onclick="remove_order(event)" data-id="${order.ORDER_ID}">Remove</button>`;
    });
}
function showOrders(){
    fetch('php/manage_retrieve_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      if(result['error'] === "no"){
        alert("No Orders yet");
      } else {
        fetchOrders(result);
      }
    })
    .catch(error => {
        console.log(error);
    });
}


document.addEventListener("DOMContentLoaded", function() {
  
    const InvoiceBtn = document.getElementById("invoice");
    InvoiceBtn.addEventListener("click", showInvoices);
  
    const InventoryBtn = document.getElementById("inventory");
    InventoryBtn.addEventListener("click", showInventory);
  
    const CustomerBtn = document.getElementById("customer");
    CustomerBtn.addEventListener("click", showCustomers);

    // const FinanceBtn = document.getElementsByClassName("finance");
    // closeModal.addEventListener("click", closeBookModal);

    const OrderBtn = document.getElementById("order");
    OrderBtn.addEventListener("click", showOrders);
  
  });
  