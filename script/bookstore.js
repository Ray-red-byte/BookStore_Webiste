function Rangebar(){ 
  const yearRangeleft = document.getElementById('yearRangeleft');
  const yearRangeright = document.getElementById('yearRangeright');
  const selectedYearleft = document.getElementById('selectedYearleft');
  const selectedYearright = document.getElementById('selectedYearright');

  yearRangeleft.addEventListener('input', function() {
    if (parseFloat(yearRangeleft.value) >= parseFloat(yearRangeright.value)) {
      yearRangeleft.value = parseFloat(yearRangeright.value) - 1;
    }
    selectedYearleft.textContent = yearRangeleft.value;
  });

  yearRangeright.addEventListener('input', function() {
    if (parseFloat(yearRangeright.value) <= parseFloat(yearRangeleft.value)) {
      yearRangeright.value = parseFloat(yearRangeleft.value) + 1;
    }
    selectedYearright.textContent = yearRangeright.value;
  });

  const priceRangeleft = document.getElementById('priceRangeleft');
  const priceRangeright = document.getElementById('priceRangeright');
  const selectedPriceleft = document.getElementById('selectedPriceleft');
  const selectedPriceright = document.getElementById('selectedPriceright');

  priceRangeleft.addEventListener('input', function() {
    if (parseFloat(priceRangeleft.value) >= parseFloat(priceRangeright.value)) {
      priceRangeleft.value = parseFloat(priceRangeright.value) - 1;
    }
    selectedPriceleft.textContent = priceRangeleft.value;
  });

  priceRangeright.addEventListener('input', function() {
    if (parseFloat(priceRangeright.value) <= parseFloat(priceRangeleft.value)) {
      priceRangeright.value = parseFloat(priceRangeleft.value) + 1;
    }
    selectedPriceright.textContent = priceRangeright.value;
  });

  return {yearLeft:yearRangeleft.value, yearRight:yearRangeright.value, priceLeft:priceRangeleft.value, priceRight:priceRangeright.value};
}

//--------------------------Show Detail & Show row------------------------------
function fetchBooks(books) {

  const tbody = document.getElementById("bookTable").querySelector("tbody");
  const bookDetailsModal = document.getElementById("bookDetailsModal");

  // Clear existing table rows
  while (tbody.rows.length > 0) {
    tbody.deleteRow(0);
  }
  // Insert new rows
  books.forEach(book => {
    const row = tbody.insertRow();

    // Add a CSS class to the row for styling
    row.classList.add("row");

    const titleCell = row.insertCell();
    titleCell.innerHTML = book.BOOK_NAME;
    titleCell.style.textAlign = "left";
    titleCell.style.paddingLeft = "20px";

    const editionCell = row.insertCell();
    editionCell.innerHTML = book.BOOK_EDITION;

    const authorCell = row.insertCell();
    authorCell.innerHTML = book.BOOK_AUTHOR;
    authorCell.style.textAlign = "left";
    authorCell.style.paddingLeft = "20px";

    const detailCell = row.insertCell();
    const showDetailImg = document.createElement("img");
    showDetailImg.id = "show-detail";
    showDetailImg.classList.add("show-detail-img");
    showDetailImg.src = "image/add.png";
    showDetailImg.setAttribute("data-id", book.BOOK_ID); // Set the bookId as a custom attribute
    detailCell.appendChild(showDetailImg);

    const addToCartCell = row.insertCell();
    addToCartCell.innerHTML = `<button id="addToCart" class="addTocart-button" onclick="addToCart(event)" data-id="${book.BOOK_ID}">Add to Cart</button>`;
  });
}

function fetchAdditionalDetails(bookId) {
  return fetch('php/book_detail.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bookId: parseInt(bookId) })
  })
  .then(response => response.json());
}

function showDetails(data, row, bookId){
    //Get bookID id ckick image

    const bookTitle = row.cells[0].innerHTML;
    const bookEdition = row.cells[1].innerHTML;
    const bookAuthor = row.cells[2].innerHTML;

    //Get from database
    let {BOOK_YEAR_OF_PUBLCATION, BOOK_PRICE} = data[0];
    displayBookModal(bookTitle, bookEdition, bookAuthor, BOOK_YEAR_OF_PUBLCATION, BOOK_PRICE, bookId);

}

function handleBookClick(event) {
  const showDetail = event.target.closest(".show-detail-img");
  const bookId = showDetail.dataset.id;
  const row = event.target.closest("tr");

  // Perform additional operations based on the retrieved data
  fetchAdditionalDetails(bookId)
    .then(details => {
      // Show more details using the fetched data
      showDetails(details, row, bookId);
    })
    .catch(error => {
      alert(error);
    });
}

function displayBookModal(title, edition, author, publicationYear, price, bookId) {
  const bookDetailsModal = document.getElementById("bookDetailsModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalEdition = document.getElementById("modalEdition");
  const modalAuthor = document.getElementById("modalAuthor");
  const modalPublicationYear = document.getElementById("modalPublicationYear");
  const modalPrice = document.getElementById("modalPrice");
  const modalbutton = document.getElementById("addToCart");

  modalTitle.textContent = title;
  modalEdition.textContent = `Edition: ${edition}`;
  modalAuthor.textContent = `Author: ${author}`;
  modalPublicationYear.textContent = `Publication Year: ${publicationYear}`;
  modalPrice.textContent = `$ ${price}`;
  modalbutton.setAttribute("data-id", bookId);

  bookDetailsModal.style.display = "block";
}

function closeBookModal() {
  const bookDetailsModal = document.getElementById("bookDetailsModal");
  bookDetailsModal.style.display = "none";
}

function applyFilters() {
  const { yearLeft, yearRight, priceLeft, priceRight } = Rangebar();
  const data = {
    yearLeft: yearLeft,
    yearRight: parseInt(yearRight),
    priceLeft: parseFloat(priceLeft),
    priceRight: parseFloat(priceRight)
  };

  fetch('php/book_rangebar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    fetchBooks(result); 
    const showDetailImages = document.querySelectorAll('.show-detail-img');
    showDetailImages.forEach(image => {
      image.addEventListener('click', handleBookClick);
    });
  })
  .catch(error => {
    alert("No books Match");
  });
}

function search(){
  const booknameFilter = document.getElementById("booknameFilter").value;
  const authorFilter = document.getElementById("authorFilter").value;
  const data = {
    bookname: booknameFilter,
    author: authorFilter
  };
  
  fetch('php/book_search.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    fetchBooks(result); 
    // Attach event listeners to the newly inserted rows
    const showDetailImages = document.querySelectorAll('.show-detail-img');
    showDetailImages.forEach(image => {
      image.addEventListener('click', handleBookClick);
    });
  })
  .catch(error => {
    alert(error);
  });
}

function showTop10books(){
  fetch('php/book_top.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(result => {
    fetchBooks(result); 
    // Attach event listeners to the newly inserted rows
    const showDetailImages = document.querySelectorAll('.show-detail-img');
    showDetailImages.forEach(image => {
      image.addEventListener('click', handleBookClick);
    });
  })
  .catch(error => {
    alert(error);
  });
}

function Insert_book_intoorder(bookId) {
  return fetch('php/order.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bookId: parseInt(bookId) })
  })
  .then(response => response.json());
}

function show_cart_notification(notification_number){
  const notification = document.getElementById("notification");
  notification.innerHTML = notification_number;
}

function getCurrentNotification(){
  fetch('php/get_notification.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(notification => {
    show_cart_notification(notification);
  })
  .catch(error => {
    alert(error);
  });
}

function increment_cart_icon(){
  //Get digit icon from html
  const notification = document.getElementById("notification");
  var notification_number = parseInt(notification.innerHTML);

  //add one
  notification_number += 1;
  notification.innerHTML = notification_number;
}

function addToCart(event) {
  const addcartbtn = event.target.closest(".addTocart-button");
  const bookId = addcartbtn.dataset.id;

  // Perform additional operations based on the retrieved data
  Insert_book_intoorder(bookId)
    .then(details => {
      increment_cart_icon();
    })
    .catch(error => {
      alert("You already choose this book");
    });
}


document.addEventListener("DOMContentLoaded", function() {
  // Retrieve and display books from the server
  Rangebar();
  getCurrentNotification();
  showTop10books();

  const applyFiltersBtn = document.getElementById("applyFilters");
  applyFiltersBtn.addEventListener("click", applyFilters);

  const searchBtn = document.getElementById("search");
  searchBtn.addEventListener("click", search);

  const closeModal = document.getElementsByClassName("close-button")[0];
  closeModal.addEventListener("click", closeBookModal);

});


