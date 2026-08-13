const products = [
  {
    name: "iPhone 15 Pro",
    price: "₹69,999"
  },
  {
    name: "Galaxy S25 Ultra",
    price: "₹84,999"
  },
  {
    name: "OnePlus 13",
    price: "₹52,999"
  },
  {
    name: "iPhone 14",
    price: "₹42,500"
  }
];

const grid = document.getElementById("products");
const search = document.getElementById("search");
const sellForm = document.getElementById("sellForm");

function render(query = "") {
  grid.innerHTML = "";

  const filtered = products.filter(phone =>
    phone.name.toLowerCase().includes(query.toLowerCase())
  );

  filtered.forEach(phone => {
    grid.innerHTML += `
      <div class="card">
        <h3>${phone.name}</h3>
        <div class="price">${phone.price}</div>
        <button class="btn" onclick="buyPhone('${phone.name}','${phone.price}')">
          View Details
        </button>
      </div>
    `;
  });
}

function buyPhone(name, price) {
  const text =
    `Hi JB Store! I'm interested in ${name} (${price}).`;

  window.open(
    "https://wa.me/919999999999?text=" + encodeURIComponent(text),
    "_blank"
  );
}

search.addEventListener("input", e => {
  render(e.target.value);
});

sellForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const model = document.getElementById("model").value;

  const text =
    `Hi JB Store!%0AName: ${name}%0APhone Model: ${model}`;

  window.open(
    "https://wa.me/919999999999?text=" + text,
    "_blank"
  );
});

render();
