const products = [
  {name:"iPhone 16 Pro Max", price:"₹1,34,900", type:"New"},
  {name:"iPhone 15 Pro", price:"₹89,900", type:"Used"},
  {name:"Galaxy S25 Ultra", price:"₹1,09,999", type:"New"},
  {name:"Galaxy S24 Ultra", price:"₹74,999", type:"Used"},
  {name:"OnePlus 13", price:"₹54,999", type:"New"},
  {name:"OnePlus 12", price:"₹39,999", type:"Used"},
  {name:"Nothing Phone 3", price:"₹42,999", type:"New"},
  {name:"Pixel 9 Pro", price:"₹79,999", type:"New"},
  {name:"Pixel 8", price:"₹34,999", type:"Used"},
  {name:"iPhone 14", price:"₹46,500", type:"Used"},
  {name:"Vivo X200", price:"₹58,999", type:"New"},
  {name:"Xiaomi 15", price:"₹49,999", type:"New"}
];

const grid = document.getElementById("products");
const search = document.getElementById("search");
const sellForm = document.getElementById("sellForm");

function render(query = ""){
  grid.innerHTML = "";

  const list = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  list.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <div style="height:140px;border-radius:12px;background:#1b1b1b;
        display:flex;align-items:center;justify-content:center;
        font-size:52px;">📱</div>

        <p style="color:#D4AF37;margin-top:12px;font-size:13px">
          ${p.type}
        </p>

        <h3>${p.name}</h3>

        <div class="price">${p.price}</div>

        <button class="btn gold"
          onclick="enquiry('${p.name}','${p.price}')"
          style="width:100%;margin-top:10px">
          Enquire
        </button>
      </div>`;
  });
}

function enquiry(name,price){
  const msg =
`Hi JB Store!

I'm interested in:

📱 ${name}
💰 ${price}

Please send details.`;

  window.open(
    "https://wa.me/91YOURNUMBER?text="+encodeURIComponent(msg),
    "_blank"
  );
}

search.addEventListener("input", e=>{
  render(e.target.value);
});

sellForm.addEventListener("submit", e=>{
  e.preventDefault();

  const name = document.getElementById("name").value;
  const model = document.getElementById("model").value;

  const msg =
`Hi JB Store!

Name: ${name}

I want to sell my phone.

Model: ${model}`;

  window.open(
    "https://wa.me/91YOURNUMBER?text="+encodeURIComponent(msg),
    "_blank"
  );
});

render();
