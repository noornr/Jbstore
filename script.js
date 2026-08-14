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
