/* =========================
   JB STORE PREMIUM
========================= */

const productGrid = document.getElementById("productGrid");
const search = document.getElementById("search");
const sort = document.getElementById("sort");

const filters = document.querySelectorAll(".filter");

let selectedBrand = "All";
let currentPhone = null;

let wishlist = JSON.parse(
    localStorage.getItem("jbWishlist")
) || [];

/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(){

    const keyword = search.value.toLowerCase();

    let list = mobiles.filter(phone=>{

        const matchBrand =
            selectedBrand==="All" ||
            phone.brand===selectedBrand;

        const matchSearch =
            phone.name.toLowerCase().includes(keyword);

        return matchBrand && matchSearch;

    });

    if(sort.value==="low"){
        list.sort((a,b)=>a.price-b.price);
    }

    if(sort.value==="high"){
        list.sort((a,b)=>b.price-a.price);
    }

    productGrid.innerHTML="";

   sort.addEventListener("change",renderProducts);

    productGrid.innerHTML="";

    list.forEach(phone=>{

        productGrid.innerHTML += `

        <div class="card"
             onclick="openProduct(${phone.id})">

            <div class="card-image">

                <div class="badge">
                    ${phone.badge}
                </div>

                <div class="wish"
     onclick="event.stopPropagation();toggleWishlist(${phone.id})">

    ${wishlist.includes(phone.id) ? "❤️" : "🤍"}

</div>
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

    currentPhone = mobiles.find(item => item.id === id);

    modal.style.display = "flex";

    modalTitle.innerText = currentPhone.name;

    modalPrice.innerText =
        "₹" + currentPhone.price.toLocaleString("en-IN");

    modalSpecs.innerHTML = `
    <div class="spec-item">📱 <b>Brand:</b> ${currentPhone.brand}</div>
    <div class="spec-item">💾 <b>Storage:</b> ${currentPhone.storage}</div>
    <div class="spec-item">🖥️ <b>Display:</b> ${currentPhone.display}</div>
    <div class="spec-item">📷 <b>Camera:</b> ${currentPhone.camera}</div>
    <div class="spec-item">⚡ <b>Processor:</b> ${currentPhone.processor}</div>
    <div class="spec-item">🔋 <b>Battery:</b> ${currentPhone.battery}</div>
    <div class="spec-item">🎨 <b>Color:</b> ${currentPhone.color}</div>
    <div class="spec-item">🛡️ <b>Warranty:</b> ${currentPhone.warranty}</div>
    <div class="spec-item">✅ <b>Condition:</b> ${currentPhone.condition}</div>
    `;

    const main = document.getElementById("mainImage");
    const thumbs = document.getElementById("thumbs");

    main.src = currentPhone.images[0];
    thumbs.innerHTML = "";

    currentPhone.images.forEach(img => {
        thumbs.innerHTML += `
        <img src="${img}" onclick="changeImage('${img}')">
        `;
    });

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

document.getElementById("shopBtn").onclick = () => {
    document.getElementById("products")
        .scrollIntoView({behavior:"smooth"});
};

document.getElementById("sellBtn").onclick = () => {
    document.getElementById("sell")
        .scrollIntoView({behavior:"smooth"});
};

document.getElementById("contactBtn").onclick = () => {
    window.open(
        "https://wa.me/919999999999",
        "_blank"
    );
};

/* =========================
   INITIAL LOAD
========================= */

renderProducts();

/* =========================
   IMAGE GALLERY
========================= */

function changeImage(src){

    document.getElementById("mainImage").src = src;

}

/* =========================
   WISHLIST
========================= */


function toggleWishlist(id){

    if(wishlist.includes(id)){

        wishlist = wishlist.filter(x => x !== id);

    }else{

        wishlist.push(id);

    }

    localStorage.setItem(
        "jbWishlist",
        JSON.stringify(wishlist)
    );

    renderProducts();

}

function goHome(){
    document.getElementById("home").scrollIntoView({behavior:"smooth"});
}

function goProducts(){
    document.getElementById("products").scrollIntoView({behavior:"smooth"});
}

function goSell(){
    document.getElementById("sell").scrollIntoView({behavior:"smooth"});
}

function goContact(){
    document.getElementById("contact").scrollIntoView({behavior:"smooth"});
}
