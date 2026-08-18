// ===== AUTO BANNER SLIDER =====
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index){
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

setInterval(()=>{
  current = (current + 1) % slides.length;
  showSlide(current);
},3500);


// ===== DYNAMIC CATEGORY FILTER =====
const brands = {
  mobiles:["iPhone","Samsung","OnePlus","Google Pixel","Vivo","OPPO"],
  second:["iPhone","Samsung","OnePlus","Vivo"],
  fridge:["LG","Samsung","Godrej","Haier","Whirlpool"],
  washing:["LG","Samsung","IFB","Bosch","Haier"],
  ac:["Daikin","LG","Voltas","Blue Star"],
  tv:["Sony","Samsung","LG","TCL","Xiaomi"]
};

const brandBox = document.getElementById("brandFilters");

function loadBrands(category){
  brandBox.innerHTML = "";

  brands[category].forEach(name=>{
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.innerText = name;

    chip.onclick = ()=>{
      chip.classList.toggle("on");
    };

    brandBox.appendChild(chip);
  });
}

loadBrands("mobiles");

document.querySelectorAll(".cat").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".cat").forEach(c=>c.classList.remove("active"));
    btn.classList.add("active");
    loadBrands(btn.dataset.cat);
  });
});

document.getElementById("clearFilter").onclick = ()=>{
  document.querySelectorAll(".chip").forEach(c=>c.classList.remove("on"));
};
