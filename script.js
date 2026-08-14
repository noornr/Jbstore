/* =========================
   JB STORE PREMIUM
========================= */

const productGrid = document.getElementById("productGrid");
const search = document.getElementById("search");

const filters = document.querySelectorAll(".filter");

let selectedBrand = "All";
let currentPhone = null;

/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(){

    const keyword = search.value.toLowerCase();

    const list = mobiles.filter(phone=>{

        const matchBrand =
            selectedBrand==="All" ||
            phone.brand===selectedBrand;

        const matchSearch =
            phone.name.toLowerCase()
            .includes(keyword);

        return matchBrand && matchSearch;

    });

    productGrid.innerHTML="";

    list.forEach(phone=>{

        productGrid.innerHTML += `

        <div class="card"
             onclick="openProduct(${phone.id})">

            <div class="card-image">

                <div class="badge">
                    ${phone.badge}
                </div>

                <div class="wish">♡</div>

            </div>

            <div class="card-body">

                <div class="brand">
                    ${phone.brand}
                </div>

                <div class="title">
                    ${phone.name}
                </div>

                <div class="storage">
                    ${phone.storage}
                </div>

                <div class="price">
                    ₹${phone.price.toLocaleString("en-IN")}
                </div>

                <button class="buy-btn">
                    View Details
                </button>

            </div>

        </div>`;

    });

}

/* =========================
   SEARCH
========================= */

search.addEventListener("input",renderProducts);

/* =========================
   FILTER
========================= */

filters.forEach(btn=>{

    btn.onclick=()=>{

        filters.forEach(b=>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        selectedBrand=btn.dataset.brand;

        renderProducts();

    };

});

/* =========================
   PRODUCT DETAILS MODAL
========================= */

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalSpecs = document.getElementById("modalSpecs");
const closeModalBtn = document.getElementById("closeModal");
const buyNowBtn = document.getElementById("buyNow");

function openProduct(id){

    currentPhone =
        mobiles.find(item => item.id === id);

    modal.style.display = "flex";

    modalTitle.innerText =
        currentPhone.name;

    modalPrice.innerText =
        "₹" +
        currentPhone.price.toLocaleString("en-IN");

    modalSpecs.innerHTML = `
        <p><b>Brand:</b> ${currentPhone.brand}</p>
        <p><b>Storage:</b> ${currentPhone.storage}</p>
        <p><b>Battery:</b> ${currentPhone.battery}</p>
        <p><b>Condition:</b> ${currentPhone.condition}</p>
        <p><b>Color:</b> ${currentPhone.color}</p>
        <p><b>Warranty:</b> ${currentPhone.warranty}</p>
    `;

}

function closeProduct(){

    modal.style.display = "none";

}

closeModalBtn.onclick = closeProduct;

modal.onclick = e =>{

    if(e.target === modal){

        closeProduct();

    }

};

/* =========================
   WHATSAPP BUY NOW
========================= */

buyNowBtn.onclick = ()=>{

    const msg =
`Hi JB Store,

I'm interested in:

📱 ${currentPhone.name}
💰 ₹${currentPhone.price.toLocaleString("en-IN")}
💾 ${currentPhone.storage}`;

    window.open(
        "https://wa.me/919999999999?text=" +
        encodeURIComponent(msg),
        "_blank"
    );

};

/* =========================
   SELL FORM
========================= */

const sellForm = document.getElementById("sellForm");

sellForm.addEventListener("submit",e=>{

    e.preventDefault();

    const msg =
`Hi JB Store,

I want to sell my phone.

Name: ${sellerName.value}

Phone: ${sellerPhone.value}

Model: ${phoneModel.value}

Condition:
${condition.value}`;

    window.open(
        "https://wa.me/919999999999?text="+
        encodeURIComponent(msg),
        "_blank"
    );

});

/* =========================
   HERO BUTTONS
========================= */

shopBtn.onclick=()=>{

    document
    .getElementById("products")
    .scrollIntoView({
        behavior:"smooth"
    });

};

sellBtn.onclick=()=>{

    document
    .getElementById("sell")
    .scrollIntoView({
        behavior:"smooth"
    });

};

contactBtn.onclick=()=>{

    window.open(
    "https://wa.me/919999999999",
    "_blank"
    );

};

/* =========================
   INITIAL LOAD
========================= */

renderProducts();
