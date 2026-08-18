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
