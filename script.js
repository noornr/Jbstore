// ==========================================
// JB STORE - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// 1. BANNER SLIDER
// ==========================================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index){

  if(!slides.length) return;

  slides.forEach(slide=>{
    slide.classList.remove("active");
  });

  dots.forEach(dot=>{
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");

  if(dots[index]){
    dots[index].classList.add("active");
  }
}

if(slides.length > 1){

  setInterval(()=>{

    current = (current + 1) % slides.length;

    showSlide(current);

  },3500);

}


// ==========================================
// 2. ALL PRODUCTS
// ==========================================

const allProducts = [

  ...mobileProducts,
  ...refrigeratorProducts,
  ...washingProducts,
  ...acProducts,
  ...tvProducts

];


// ==========================================
// 3. BRAND DATA
// ==========================================

const brands = {

  mobiles:[
    "iPhone",
    "OnePlus",
    "Samsung",
    "Google Pixel",
    "Vivo",
    "OPPO"
  ],

  second:[
    "iPhone",
    "Samsung",
    "OnePlus",
    "Vivo"
  ],

  fridge:[
    "LG",
    "Samsung",
    "Godrej",
    "Haier",
    "Whirlpool"
  ],

  washing:[
    "LG",
    "Samsung",
    "IFB",
    "Bosch",
    "Haier",
    "Whirlpool"
  ],

  ac:[
    "Daikin",
    "LG",
    "Voltas",
    "Blue Star",
    "Samsung"
  ],

  tv:[
    "Sony",
    "Samsung",
    "LG",
    "TCL",
    "Xiaomi"
  ]

};


// ==========================================
// 4. CURRENT FILTER
// ==========================================

let currentCategory = "mobiles";

let selectedBrand = null;


// ==========================================
// 5. ELEMENTS
// ==========================================

const brandBox =
  document.getElementById("brandFilters");

const productGrid =
  document.getElementById("productGrid");

const productTitle =
  document.getElementById("productTitle");

const clearFilter =
  document.getElementById("clearFilter");


// ==========================================
// 6. LOAD BRAND BUTTONS
// ==========================================

function loadBrands(category){

  if(!brandBox) return;

  brandBox.innerHTML = "";

  selectedBrand = null;

  brands[category].forEach(brand=>{

    const chip =
      document.createElement("button");

    chip.type = "button";

    chip.className = "chip";

    chip.innerText = brand;

    chip.addEventListener("click",()=>{

      document
        .querySelectorAll(".chip")
        .forEach(c=>{
          c.classList.remove("on");
        });

      chip.classList.add("on");

      selectedBrand = brand;

      displayProducts();

    });

    brandBox.appendChild(chip);

  });

}


// ==========================================
// 7. DISPLAY PRODUCTS
// ==========================================

function displayProducts(){

  if(!productGrid) return;

  productGrid.innerHTML = "";


  // Get products for selected category

  let products;


  // MOBILES = SEAL PACK ONLY

  if(currentCategory === "mobiles"){

    products =
      allProducts.filter(product => {

        return (
          product.category === "mobiles" &&
          product.condition === "Seal Pack"
        );

      });

  }


  // 2ND HAND = SECOND HAND ONLY

  else if(currentCategory === "second"){

    products =
      allProducts.filter(product => {

        return (
          product.category === "mobiles" &&
          product.condition === "2nd Hand"
        );

      });

  }


  // OTHER CATEGORIES

  else{

    products =
      allProducts.filter(product => {

        return product.category === currentCategory;

      });

  }


  // ==========================================
  // BRAND FILTER
  // ==========================================

  if(selectedBrand){

    products =
      products.filter(product => {

        return product.brand === selectedBrand;

      });

  }


  // ==========================================
  // NO PRODUCTS
  // ==========================================

  if(products.length === 0){

    productGrid.innerHTML = `

      <div class="no-products">

        <h3>No products found</h3>

        <p>Try another brand.</p>

      </div>

    `;

    return;

  }


  // ==========================================
  // CREATE PRODUCT CARDS
  // ==========================================

  products.forEach(product=>{

    const card =
      document.createElement("div");

    card.className = "deal-card";


    card.innerHTML = `

      <span class="offer">
        ${product.discount}
      </span>

      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <h3>
        ${product.name}
      </h3>

      <p class="brand">
        ${product.brand}
        •
        ${product.condition || "New"}
      </p>

      <div class="rating">
        ⭐ ${product.rating}
        <span>
          (${product.reviews})
        </span>
      </div>

      <p class="price">
        ₹${product.price.toLocaleString("en-IN")}
      </p>

      <p class="old-price">
        ₹${product.oldPrice.toLocaleString("en-IN")}
      </p>

      <button
        type="button"
        onclick="viewProduct('${product.id}')"
      >
        View Details
      </button>

    `;


    productGrid.appendChild(card);

  });

}


// ==========================================
// 8. CATEGORY BUTTONS
// ==========================================

document
  .querySelectorAll(".cat")
  .forEach(button=>{

    button.addEventListener("click",()=>{

      document
        .querySelectorAll(".cat")
        .forEach(btn=>{
          btn.classList.remove("active");
        });


      button.classList.add("active");


      currentCategory =
        button.dataset.cat;


      selectedBrand = null;


      loadBrands(currentCategory);


      displayProducts();

    });

  });


// ==========================================
// 9. CLEAR ALL
// ==========================================

if(clearFilter){

  clearFilter.addEventListener("click",()=>{

    selectedBrand = null;


    document
      .querySelectorAll(".chip")
      .forEach(chip=>{
        chip.classList.remove("on");
      });


    displayProducts();

  });

}


// ==========================================
// 10. VIEW PRODUCT
// ==========================================

function viewProduct(id){

  const product =
    allProducts.find(
      item => item.id === id
    );


  if(!product) return;


  localStorage.setItem(
    "selectedProduct",
    JSON.stringify(product)
  );


  window.location.href =
    "product.html";

}


// ==========================================
// 11. INITIAL LOAD
// ==========================================

loadBrands("mobiles");

displayProducts();


// ==========================================
// 12. SHOP BY CATEGORY CARDS
// ==========================================

document
  .querySelectorAll(".category-card")
  .forEach(card=>{

    card.addEventListener("click",()=>{

      const category =
        card.dataset.category;


      const categoryButton =
        document.querySelector(
          `.cat[data-cat="${category}"]`
        );


      if(categoryButton){

        categoryButton.click();

      }


      const products =
        document.querySelector(".deals");


      if(products){

        products.scrollIntoView({

          behavior:"smooth",

          block:"start"

        });

      }

    });

  });


// ==========================================
// 13. SMART BRAND + CATEGORY SEARCH
// ==========================================

const searchInput =
  document.getElementById("searchInput");

const searchButton =
  document.getElementById("searchButton");

const searchSuggestions =
  document.getElementById("searchSuggestions");


// ==========================================
// CATEGORY NAMES
// ==========================================

const categoryNames = {

  mobiles: "Mobiles",

  fridge: "Refrigerators",

  washing: "Washing Machines",

  ac: "AC",

  tv: "TV"

};


// ==========================================
// CREATE SEARCH SUGGESTIONS
// ==========================================

function createSearchSuggestions(){

  if(!searchInput || !searchSuggestions){
    return;
  }


  const text =
    searchInput.value
      .trim()
      .toLowerCase();


  searchSuggestions.innerHTML = "";


  if(text === ""){

    searchSuggestions.classList.remove("show");

    return;

  }


  // ==========================================
  // FIND BRAND + CATEGORY
  // FROM ACTUAL PRODUCTS ONLY
  // ==========================================

  const combinations = new Map();


  allProducts.forEach(product => {

    const brand =
      String(product.brand || "").trim();

    const category =
      String(product.category || "").trim();


    if(!brand || !category){
      return;
    }


    const brandLower =
      brand.toLowerCase();

    const categoryLower =
      category.toLowerCase();


    // Match typed letters against
    // actual brand or category

    if(
      brandLower.includes(text) ||
      categoryLower.includes(text)
    ){

      const key =
        `${brandLower}|${categoryLower}`;


      if(!combinations.has(key)){

        combinations.set(key, {

          brand: brand,

          category: category,

          image: product.image

        });

      }

    }

  });


  // ==========================================
  // CONVERT TO ARRAY
  // ==========================================

  const suggestions =
    Array.from(
      combinations.values()
    );


  // ==========================================
  // SORT
  // ==========================================

  suggestions.sort((a,b) => {

    const aBrand =
      a.brand.toLowerCase();

    const bBrand =
      b.brand.toLowerCase();


    const aStarts =
      aBrand.startsWith(text);

    const bStarts =
      bBrand.startsWith(text);


    if(aStarts && !bStarts){
      return -1;
    }


    if(!aStarts && bStarts){
      return 1;
    }


    return aBrand.localeCompare(bBrand);

  });


  // ==========================================
  // MAXIMUM 10
  // ==========================================

  const finalResults =
    suggestions.slice(0,10);


  // ==========================================
  // NO RESULTS
  // ==========================================

  if(finalResults.length === 0){

    searchSuggestions.innerHTML = `

      <div class="search-no-result">

        No products found

      </div>

    `;

    searchSuggestions.classList.add("show");

    return;

  }


  // ==========================================
  // DISPLAY SUGGESTIONS
  // ==========================================

  finalResults.forEach(item => {

    const row =
      document.createElement("div");


    row.className =
      "search-suggestion";


    const displayCategory =
      categoryNames[
        item.category
      ] || item.category;


    row.innerHTML = `

      <img
        src="${item.image}"
        alt=""
      >

      <div class="suggestion-info">

        <div class="suggestion-name">

          ${highlightSearch(
            item.brand,
            text
          )}

          ${displayCategory}

        </div>

        <div class="suggestion-category">

          View ${item.brand}
          ${displayCategory}

        </div>

      </div>

      <span class="suggestion-arrow">
        ↗
      </span>

    `;


    // ========================================
    // CLICK SUGGESTION
    // ========================================

    // ========================================
// CLICK SUGGESTION
// ========================================

row.addEventListener(
  "click",
  () => {

    window.location.href =
      "search.html?brand=" +
      encodeURIComponent(item.brand) +
      "&category=" +
      encodeURIComponent(item.category);

  }
);


    searchSuggestions.appendChild(row);

  });


  searchSuggestions.classList.add("show");

}


// ==========================================
// HIGHLIGHT SEARCH TEXT
// ==========================================

function highlightSearch(
  text,
  search
){

  const escaped =
    search.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );


  return text.replace(

    new RegExp(
      `(${escaped})`,
      "ig"
    ),

    "<strong>$1</strong>"

  );

}


// ==========================================
// OPEN SEARCH RESULTS PAGE
// ==========================================

function openSearchResults(value){

  if(!value){
    return;
  }


  window.location.href =
    "search.html?q=" +
    encodeURIComponent(value);

}


// ==========================================
// LIVE SEARCH
// ==========================================

if(searchInput){

  searchInput.addEventListener(
    "input",
    createSearchSuggestions
  );

}


// ==========================================
// SEARCH BUTTON
// ==========================================

if(searchButton){

  searchButton.addEventListener(
    "click",
    () => {

      const value =
        searchInput.value.trim();


      if(value){

        openSearchResults(value);

      }

    }
  );

}


// ==========================================
// ENTER KEY
// ==========================================

if(searchInput){

  searchInput.addEventListener(
    "keydown",
    event => {

      if(event.key === "Enter"){

        const value =
          searchInput.value.trim();


        if(value){

          openSearchResults(value);

        }

      }

    }
  );

}


// ==========================================
// CLOSE SUGGESTIONS
// ==========================================

document.addEventListener(
  "click",
  event => {

    if(
      searchInput &&
      searchSuggestions &&
      !searchInput.contains(event.target) &&
      !searchSuggestions.contains(event.target)
    ){

      searchSuggestions.classList.remove(
        "show"
      );

    }

  }
);

// ===== SCRIPT.JS - END LO PASTE CHEY =====

// ... your existing JavaScript ...

// ===== BOTTOM BAR ACTIVE STATE =====
const bottomItems = document.querySelectorAll('.bottom-item');

bottomItems.forEach(item => {
  item.addEventListener('click', function() {
    bottomItems.forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===== UPDATE CART BADGE =====
function updateCartBadge(count) {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    badge.textContent = count;
    if (count === 0) {
      badge.style.display = 'none';
    } else {
      badge.style.display = 'flex';
    }
  }
}
