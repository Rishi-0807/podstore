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


/* ========= APPLE-STYLE INTERSECTION REVEAL ========= */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

