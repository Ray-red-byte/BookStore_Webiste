//-----------------------Invoice----------------------------

function fetchInvoices(invoices) {
    // Create the table element
    var table = document.createElement('table');
    table.id = 'invoiceTable';
    table.classList.add('result-table');
  
    // Create the table header
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var headers = ['Book Name', 'Book Amount', 'Payment Method', 'Invoice Method', 'Ship Method', 'Address', 'Date', 'Total Price'];
  
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
        titleCell.innerHTML = invoice.BOOK_NAME;
        titleCell.style.textAlign = "left";
        titleCell.style.paddingLeft = "20px";
  
        const cusCell = row.insertCell();
        cusCell.innerHTML = invoice.ORDER_BOOK_AMOUNT;
        cusCell.style.textAlign = "left";
        cusCell.style.paddingLeft = "20px";
  
        const paymethodCell = row.insertCell();
        paymethodCell.innerHTML = invoice.PAYMENT_METHOD;
        paymethodCell.style.textAlign = "left";
        paymethodCell.style.paddingLeft = "20px";
  
        const invmethodCell = row.insertCell();
        invmethodCell.innerHTML = invoice.Invoice_Method;
        invmethodCell.style.textAlign = "left";
        invmethodCell.style.paddingLeft = "20px";

        console.log(invoice.Invoice_Method);
  
        const shipmethodCell = row.insertCell();
        shipmethodCell.innerHTML = invoice.Ship_Method;
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
        const invoicePrice = parseFloat(invoice.BOOK_PRICE);
        priceCell.innerHTML = "$" + invoicePrice.toFixed(2);
        priceCell.style.textAlign = "left";
        priceCell.style.paddingLeft = "20px";
    
     });
  }
  function showInvoices(){
      fetch('php/information_invoice.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(result => {
        console.log(result['ORDER_BOOK_AMOUNT']);
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

  document.addEventListener("DOMContentLoaded", function() {
  
    showInvoices();
  
  });
  