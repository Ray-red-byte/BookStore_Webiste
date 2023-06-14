//-----------------------Customer----------------------------
function fetchCustomers(customers) {
  // Create the table element
  var table = document.createElement('table');
  table.id = 'cusTable';
  table.classList.add('result-table');

  // Create the table header
  var thead = document.createElement('thead');
  var headerRow = document.createElement('tr');
  var headers = ['CUS NAME', 'ACCOUNT NAME', 'ACCOUNT PASSWORD', 'Phone Number', 'Coupon', 'VIP'];

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

      const cusCell = row.insertCell();
      cusCell.innerHTML = customer.CUS_NAME;
      cusCell.style.textAlign = "left";
      cusCell.style.paddingLeft = "20px";

      const accnameCell = row.insertCell();
      accnameCell.innerHTML = customer.ACCOUNT_NAME;
      accnameCell.style.textAlign = "left";
      accnameCell.style.paddingLeft = "20px";

      const accpwCell = row.insertCell();
      accpwCell.innerHTML = customer.ACCOUNT_PASSWORD;
      accpwCell.style.textAlign = "left";
      accpwCell.style.paddingLeft = "20px";

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
  
    });
  optionCusInput();
}
function showCustomers(){
    fetch('php/membership_show.php', {
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
  updateForm.setAttribute("action", "php/membership_update.php");

  //Get update-section
  var updateSection = document.getElementById("update-section");

  // Create the select element for the dropdown
  var selectMethodDropdown = document.createElement("select");
  selectMethodDropdown.id = "select-method";
  selectMethodDropdown.name = "select-method";
  selectMethodDropdown.className = "dropdown";

  // Create the options for the dropdown
  var options = ['Account_Name', 'Cus_Name', 'account_Password', 'Phone_Number'];
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
  inputbutton.value="Update";
  inputbutton.textContent = "Update";

  dropdown.addEventListener("change", function() {
    inputUpdate.type = "text";
    // Append the inputUpdate element to the inputContainer
    inputContainer.appendChild(inputUpdate);
    inputContainer.appendChild(inputbutton);
  });
}



document.addEventListener("DOMContentLoaded", function() {
    showCustomers();
});
  