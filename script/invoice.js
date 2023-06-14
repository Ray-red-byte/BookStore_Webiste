function displayTotalPrice(){ 
 // Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Parse the total price and book amounts from the URL parameters
  const totalPrice = urlParams.get("totalPrice");

  // Example usage: Display the total price and book amounts on the Invoice page
  document.getElementById("total-price").textContent = "Total Price:" + totalPrice;
  
}

function getBookAmount(){
  const urlParams = new URLSearchParams(window.location.search);
  const bookAmounts = urlParams.get("bookAmounts");
  const stringArray = bookAmounts.split(",");
  const integerArray = stringArray.map(value => parseInt(value.trim()));

  const paymentMethod = document.getElementById('payment-method').value;
  const address = document.getElementById('address').value;
  const shippingMethod = document.getElementById('shipping-method').value;
  const invoiceMethod = document.getElementById('invoice-method').value;
  const totalPrice = parseFloat((document.getElementById('total-price').innerHTML).replace("Total Price:$", ""));
  
  fetch('php/invoice.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({bookAmounts: integerArray,
                          paymentMethod: paymentMethod,
                          shippingMethod: shippingMethod,
                          invoiceMethod: invoiceMethod,
                          address: address,
                          totalPrice: totalPrice
                         })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
    if (result == 'success'){
      alert("Complete! Thank you");
      setTimeout(function() {
        window.location.href = "bookstore.html";
      }, 2000);
    }
  })
  .catch(error => {
    alert(error);
  });
}

document.addEventListener("DOMContentLoaded", function() {

  document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for this example
    
    var paymentMethod = document.getElementById('payment-method').value;
    var address = document.getElementById('address').value;
    var shippingMethod = document.getElementById('shipping-method').value;
    var invoiceMethod = document.getElementById('invoice-method').value;
    
    // Perform further processing or submit the form data to a server
    
    console.log('Payment Method:', paymentMethod);
    console.log('Address:', address);
    console.log('Shipping Method:', shippingMethod);
    console.log('Invoice Method:', invoiceMethod);
  });

  displayTotalPrice();

  const passBookAmount = document.getElementById("pay");
  passBookAmount.addEventListener("click", getBookAmount);
});

  