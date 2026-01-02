const WHATSAPP_NUMBER = "919003028687";

function openWhatsApp(msg) {
  window.location.href =
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
}

function v(id) {
  return Number(document.getElementById(id).value);
}

function calc5() {
  let t = v("s5") + v("b5") + v("bat5") + v("h5");
  if (t5.checked) t += 3500;
  total5.innerText = t;
}

function calc7() {
  let t = v("s7") + v("b7") + v("bat7") + v("h7");
  if (t7.checked) t += 3500;
  total7.innerText = t;
}

function order5() {
  openWhatsApp(`Hi, I want iPod Classic 5th Gen\nPrice: ₹${total5.innerText}`);
}

function order7() {
  openWhatsApp(`Hi, I want iPod Classic 7th Gen\nPrice: ₹${total7.innerText}`);
}

function orderNano(m,p) {
  openWhatsApp(`Hi, I want ${m}\nPrice: ${p}`);
}

window.onload = () => {
  calc5();
  calc7();
};

/* ========= APPLE-STYLE SCROLL REVEAL ========= */

const revealElements = document.querySelectorAll(".section, .product-card, .review-card");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ===== SIMPLE SAFE REVEAL (WORKS 100%) ===== */

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");

  items.forEach(el => {
    el.style.opacity = 1;
    el.style.transform = "translateY(0)";
  });
});

/* ================= HERO IMAGE ROTATION ================= */

const heroImages = [
  "images/ipod-hero.png",     // existing (default)
  "images/ipod-hero-1.png",
  "images/ipod-hero-2.png",
  "images/ipod-hero-3.png"
];

let heroIndex = 0;
const heroImg = document.getElementById("heroImage");

if (heroImg) {
  setInterval(() => {
    heroImg.classList.add("fade-out");

    setTimeout(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroImg.src = heroImages[heroIndex];
      heroImg.classList.remove("fade-out");
      heroImg.classList.add("fade-in");
    }, 600);

    setTimeout(() => {
      heroImg.classList.remove("fade-in");
    }, 1200);

  }, 3500); // change image every 3.5 seconds
}
