const slides=document.querySelectorAll(".slide");
const dots=document.querySelectorAll(".dot");

let current=0;

function showSlide(index){

slides.forEach(s=>s.classList.remove("active"));
dots.forEach(d=>d.classList.remove("active"));

slides[index].classList.add("active");
dots[index].classList.add("active");

}

setInterval(()=>{

current=(current+1)%slides.length;
showSlide(current);

},3500);
