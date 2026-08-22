// ==========================================
// JB STORE - MAIN JAVASCRIPT
// ==========================================

// ==========================================
// 1. BANNER SLIDER
// ==========================================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  dots.forEach(dot => {
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");

  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

if (slides.length > 1) {
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 3500);
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

console.log('Total products loaded:', allProducts.length);

// ==========================================
// 3. BRAND DATA
// ==========================================

const brands = {
  sealpack: ["iPhone", "OnePlus", "Samsung", "Google Pixel", "Vivo", "OPPO"],
  sealcut: ["iPhone", "Samsung", "OnePlus"],
  second: ["iPhone", "Samsung", "OnePlus", "Vivo"],
  mobiles: ["iPhone", "OnePlus", "Samsung", "Google Pixel", "Vivo", "OPPO"],
  fridge: ["LG", "Samsung", "Godrej", "Haier", "Whirlpool"],
  washing: ["LG", "Samsung", "IFB", "Bosch", "Haier", "Whirlpool"],
  ac: ["Daikin", "LG", "Voltas", "Blue Star", "Samsung"],
  tv: ["Sony", "Samsung", "LG", "TCL", "Xiaomi"]
};

// ==========================================
// 4. CURRENT FILTER
// ==========================================

let currentCategory = "mobiles";
let selectedBrand = null;

// ==========================================
// 5. ELEMENTS
// ==========================================

const brandBox = document.getElementById("brandFilters");
const productGrid = document.getElementById("productGrid");
const productTitle = document.getElementById("productTitle");
const clearFilter = document.getElementById("clearFilter");

// ==========================================
// 6. LOAD BRAND BUTTONS
// ==========================================

function loadBrands(category) {
  if (!brandBox) return;

  brandBox.innerHTML = "";
  selectedBrand = null;

  if (!brands[category]) return;

  brands[category].forEach(brand => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.innerText = brand;

    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach(c => {
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

function displayProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = "";

  let products;

  // ===== SEAL PACK =====
  if (currentCategory === "sealpack") {
    products = allProducts.filter(product => {
      return (
        product.category === "mobiles" &&
        product.condition === "Seal Pack"
      );
    });
  }

  // ===== SEAL CUT =====
  else if (currentCategory === "sealcut") {
    products = allProducts.filter(product => {
      return (
        product.category === "mobiles" &&
        product.condition === "Seal Cut"
      );
    });
  }

  // ===== 2ND HAND =====
  else if (currentCategory === "second") {
    products = allProducts.filter(product => {
      return (
        product.category === "mobiles" &&
        product.condition === "2nd Hand"
      );
    });
  }

  // ===== ALL MOBILES =====
  else if (currentCategory === "mobiles") {
    products = allProducts.filter(product => {
      return product.category === "mobiles";
    });
  }

  // ===== OTHER CATEGORIES =====
  else {
    products = allProducts.filter(product => {
      return product.category === currentCategory;
    });
  }

  // ===== BRAND FILTER =====
  if (selectedBrand) {
    products = products.filter(product => {
      return product.brand === selectedBrand;
    });
  }

  // ===== NO PRODUCTS =====
  if (products.length === 0) {
    productGrid.innerHTML = `
      <div class="no-products">
        <h3>No products found</h3>
        <p>Try another brand.</p>
      </div>
    `;
    return;
  }

  // ===== CREATE PRODUCT CARDS =====
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "deal-card";

    card.innerHTML = `
      <span class="offer">${product.discount || ''}</span>
      <img src="${product.image || product.images?.[0] || ''}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="brand">${product.brand} • ${product.condition || "New"}</p>
      <div class="rating">⭐ ${product.rating || '4.5'} <span>(${product.reviews || 0})</span></div>
      <p class="price">₹${(product.price || 0).toLocaleString("en-IN")}</p>
      <p class="old-price">₹${(product.oldPrice || 0).toLocaleString("en-IN")}</p>
      
      <div class="deal-actions">
        <button type="button" class="view-details-btn" onclick="viewProduct('${product.id}')">
          View Details
        </button>
        <button type="button" class="add-to-cart-btn" onclick="addToCart('${product.id}')">
          🛒 Add to Cart
        </button>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

// ==========================================
// 8. CATEGORY BUTTONS
// ==========================================

document.querySelectorAll(".cat").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".cat").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    currentCategory = button.dataset.cat;
    selectedBrand = null;
    loadBrands(currentCategory);
    displayProducts();
  });
});

// ==========================================
// 9. CLEAR ALL
// ==========================================

if (clearFilter) {
  clearFilter.addEventListener("click", () => {
    selectedBrand = null;
    document.querySelectorAll(".chip").forEach(chip => {
      chip.classList.remove("on");
    });
    displayProducts();
  });
}

// ==========================================
// 10. VIEW PRODUCT - FIXED
// ==========================================

function viewProduct(id) {
  console.log('Viewing product with ID:', id);
  
  const product = allProducts.find(item => item.id === id);
  
  if (!product) {
    console.error('Product not found with ID:', id);
    showToast('Product not found!');
    return;
  }
  
  console.log('Product found:', product.name);
  
  // Store product ID in localStorage
  localStorage.setItem('selectedProduct', JSON.stringify({ id: product.id }));
  
  // Navigate to product page with ID in URL
  window.location.href = `product.html?id=${product.id}`;
}

// ==========================================
// 10.5. CART FUNCTIONALITY
// ==========================================

// ===== ADD TO CART =====
function addToCart(productId) {
  const product = allProducts.find(item => item.id === productId);
  
  if (!product) {
    showToast('Product not found!');
    return;
  }
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
    showToast(`${product.name} quantity updated! 🛒`);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image || product.images?.[0] || '',
      quantity: 1
    });
    showToast(`${product.name} added to cart! 🛒`);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

// ===== UPDATE CART BADGE =====
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">✕</button>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (toast) {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }
  }, 3000);
}

// ==========================================
// 11. INITIAL LOAD
// ==========================================

loadBrands("mobiles");
displayProducts();

// ==========================================
// 12. SHOP BY CATEGORY CARDS
// ==========================================

document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;
    const categoryButton = document.querySelector(`.cat[data-cat="${category}"]`);

    if (categoryButton) {
      categoryButton.click();
    }

    const products = document.querySelector(".deals");
    if (products) {
      products.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ==========================================
// 13. SMART BRAND + CATEGORY SEARCH
// ==========================================

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchSuggestions = document.getElementById("searchSuggestions");

// ==========================================
// CATEGORY NAMES
// ==========================================

const categoryNames = {
  mobiles: "Mobiles",
  sealpack: "Seal Pack Mobiles",
  sealcut: "Seal Cut Mobiles",
  second: "2nd Hand Mobiles",
  fridge: "Refrigerators",
  washing: "Washing Machines",
  ac: "AC",
  tv: "TV"
};

// ==========================================
// CREATE SEARCH SUGGESTIONS
// ==========================================

function createSearchSuggestions() {
  if (!searchInput || !searchSuggestions) {
    return;
  }

  const text = searchInput.value.trim().toLowerCase();
  searchSuggestions.innerHTML = "";

  if (text === "") {
    searchSuggestions.classList.remove("show");
    return;
  }

  const combinations = new Map();

  allProducts.forEach(product => {
    const brand = String(product.brand || "").trim();
    const category = String(product.category || "").trim();

    if (!brand || !category) {
      return;
    }

    const brandLower = brand.toLowerCase();
    const categoryLower = category.toLowerCase();

    if (brandLower.includes(text) || categoryLower.includes(text)) {
      const key = `${brandLower}|${categoryLower}`;

      if (!combinations.has(key)) {
        combinations.set(key, {
          brand: brand,
          category: category,
          image: product.image || product.images?.[0] || ''
        });
      }
    }
  });

  const suggestions = Array.from(combinations.values());

  suggestions.sort((a, b) => {
    const aBrand = a.brand.toLowerCase();
    const bBrand = b.brand.toLowerCase();

    const aStarts = aBrand.startsWith(text);
    const bStarts = bBrand.startsWith(text);

    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return aBrand.localeCompare(bBrand);
  });

  const finalResults = suggestions.slice(0, 10);

  if (finalResults.length === 0) {
    searchSuggestions.innerHTML = `
      <div class="search-no-result">
        No products found
      </div>
    `;
    searchSuggestions.classList.add("show");
    return;
  }

  finalResults.forEach(item => {
    const row = document.createElement("div");
    row.className = "search-suggestion";

    const displayCategory = categoryNames[item.category] || item.category;

    row.innerHTML = `
      <img src="${item.image}" alt="">
      <div class="suggestion-info">
        <div class="suggestion-name">
          ${highlightSearch(item.brand, text)}
          ${displayCategory}
        </div>
        <div class="suggestion-category">
          View ${item.brand} ${displayCategory}
        </div>
      </div>
      <span class="suggestion-arrow">
        ↗
      </span>
    `;

    row.addEventListener("click", () => {
      window.location.href =
        "search.html?brand=" +
        encodeURIComponent(item.brand) +
        "&category=" +
        encodeURIComponent(item.category);
    });

    searchSuggestions.appendChild(row);
  });

  searchSuggestions.classList.add("show");
}

// ==========================================
// HIGHLIGHT SEARCH TEXT
// ==========================================

function highlightSearch(text, search) {
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "ig"),
    "<strong>$1</strong>"
  );
}

// ==========================================
// OPEN SEARCH RESULTS PAGE
// ==========================================

function openSearchResults(value) {
  if (!value) return;
  window.location.href = "search.html?q=" + encodeURIComponent(value);
}

// ==========================================
// LIVE SEARCH
// ==========================================

if (searchInput) {
  searchInput.addEventListener("input", createSearchSuggestions);
}

// ==========================================
// SEARCH BUTTON
// ==========================================

if (searchButton) {
  searchButton.addEventListener("click", () => {
    const value = searchInput.value.trim();
    if (value) {
      openSearchResults(value);
    }
  });
}

// ==========================================
// ENTER KEY
// ==========================================

if (searchInput) {
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      const value = searchInput.value.trim();
      if (value) {
        openSearchResults(value);
      }
    }
  });
}

// ==========================================
// CLOSE SUGGESTIONS
// ==========================================

document.addEventListener("click", event => {
  if (
    searchInput &&
    searchSuggestions &&
    !searchInput.contains(event.target) &&
    !searchSuggestions.contains(event.target)
  ) {
    searchSuggestions.classList.remove("show");
  }
});

// ==========================================
// BOTTOM BAR ACTIVE STATE
// ==========================================

const bottomItems = document.querySelectorAll('.bottom-item');

bottomItems.forEach(item => {
  item.addEventListener('click', function() {
    bottomItems.forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// ==========================================
// INITIALIZE CART BADGE ON LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
});
