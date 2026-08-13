let category="All";

const products=[
{name:"iPhone 16 Pro Max",brand:"Apple",price:"₹1,34,900"},
{name:"iPhone 15 Pro",brand:"Apple",price:"₹89,900"},
{name:"Galaxy S25 Ultra",brand:"Samsung",price:"₹1,09,999"},
{name:"Galaxy S24 Ultra",brand:"Samsung",price:"₹74,999"},
{name:"OnePlus 13",brand:"OnePlus",price:"₹54,999"},
{name:"OnePlus 12",brand:"OnePlus",price:"₹39,999"}
];

const grid=document.getElementById("products");

function render(q=""){
  grid.innerHTML="";

  products
    .filter(p=>category==="All"||p.brand===category)
    .filter(p=>p.name.toLowerCase().includes(q.toLowerCase()))
    .forEach(p=>{
      grid.innerHTML+=`
      <div class="card">
        <div style="height:140px;background:#1b1b1b;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:52px;">📱</div>

        <p style="color:#D4AF37;margin-top:10px">${p.brand}</p>
        <h3>${p.name}</h3>
        <div class="price">${p.price}</div>

        <button class="btn gold" onclick="enquiry('${p.name}','${p.price}')">
          Enquire
        </button>
      </div>`;
    });
}

function setCategory(cat,btn){
  category=cat;

  document.querySelectorAll(".filter")
    .forEach(b=>b.classList.remove("active"));

  btn.classList.add("active");
  render(search.value);
}

search.oninput=e=>render(e.target.value);

function enquiry(name,price){
  const msg=`Hi JB Store!

I want ${name}
Price: ${price}`;

  window.open(
    "https://wa.me/91YOURNUMBER?text="+encodeURIComponent(msg),
    "_blank"
  );
}

render();
