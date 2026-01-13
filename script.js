const WHATSAPP_NUMBER = "919003028687";

function openWhatsApp(msg) {
  window.location.href =
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
}

// ===== DATA-DRIVEN PRODUCTS =====
const classicProducts = [
  {
    id: "classic5",
    name: "iPod Classic 5th Gen",
    image: "images/ipod5.jpg",
    description: "Warm Wolfson DAC sound signature, preferred by audiophiles.",
    options: {
      storage: [
        { label: "64GB", value: 13500 },
        { label: "128GB", value: 14500 },
        { label: "256GB", value: 16500 },
        { label: "512GB", value: 19500 }
      ],
      bluetooth: [
        { label: "None", value: 0 },
        { label: "Standard", value: 4500 },
        { label: "Hi-Res", value: 5500 }
      ],
      battery: [
        { label: "Standard", value: 0 },
        { label: "2000mAh", value: 2200 },
        { label: "3000mAh", value: 3200 }
      ],
      housing: [
        { label: "Original", value: 0 },
        { label: "New Housing", value: 4300 }
      ],
      extras: [
        { id: "taptic", label: "Taptic Engine (+₹3500)", value: 3500 }
      ]
    }
  },
  {
    id: "classic7",
    name: "iPod Classic 7th Gen",
    image: "images/ipod7.jpg",
    description: "Final Classic generation with refined hardware and efficiency.",
    options: {
      storage: [
        { label: "64GB", value: 14000 },
        { label: "128GB", value: 16000 },
        { label: "256GB", value: 18000 },
        { label: "512GB", value: 21000 }
      ],
      bluetooth: [
        { label: "None", value: 0 },
        { label: "Standard", value: 4500 },
        { label: "Hi-Res", value: 5500 }
      ],
      battery: [
        { label: "Standard", value: 0 },
        { label: "2000mAh", value: 2200 },
        { label: "3000mAh", value: 3200 }
      ],
      housing: [
        { label: "Original", value: 0 },
        { label: "New Housing", value: 4300 }
      ],
      extras: [
        { id: "taptic", label: "Taptic Engine (+₹3500)", value: 3500 }
      ]
    }
  }
];

const nanoProducts = [
  { id: "nano3", name: "Nano 3rd Gen", image: "images/nano3.jpg", price: 4500 },
  { id: "nano5", name: "Nano 5th Gen", image: "images/nano5.jpg", price: 5500 },
  { id: "nano6", name: "Nano 6th Gen", image: "images/nano6.jpg", price: 6500 },
  { id: "nano7", name: "Nano 7th Gen", image: "images/nano7.jpg", price: 7500 }
];

function createSelect(id, labelText, options, onChange) {
  const label = document.createElement("label");
  label.textContent = labelText;

  const select = document.createElement("select");
  select.id = id;

  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  });

  select.addEventListener("change", onChange);

  return { label, select };
}

function updateClassicPrice(product) {
  let total = 0;

  ["storage", "bluetooth", "battery", "housing"].forEach(key => {
    const sel = document.getElementById(`${product.id}-${key}`);
    if (sel) total += Number(sel.value || 0);
  });

  (product.options.extras || []).forEach(extra => {
    const cb = document.getElementById(`${product.id}-${extra.id}`);
    if (cb && cb.checked) total += extra.value;
  });

  const priceEl = document.getElementById(`price-${product.id}`);
  if (priceEl) priceEl.textContent = total.toLocaleString("en-IN");
}

function orderClassic(product) {
  const priceEl = document.getElementById(`price-${product.id}`);
  const price = priceEl ? priceEl.textContent : "";
  openWhatsApp(`Hi, I want ${product.name}\nPrice: ₹${price}`);
}

function orderNano(product) {
  openWhatsApp(`Hi, I want ${product.name}\nPrice: ₹${product.price.toLocaleString("en-IN")}`);
}

function renderClassicGrid() {
  const grid = document.getElementById("classicGrid");
  if (!grid) return;

  classicProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const desc = document.createElement("p");
    desc.className = "text";
    desc.textContent = product.description;

    // Build selects
    const selects = [];
    [
      { key: "storage", label: "Storage", opts: product.options.storage },
      { key: "bluetooth", label: "Bluetooth", opts: product.options.bluetooth },
      { key: "battery", label: "Battery", opts: product.options.battery },
      { key: "housing", label: "Housing", opts: product.options.housing }
    ].forEach(cfg => {
      if (Array.isArray(cfg.opts) && cfg.opts.length) {
        const { label, select } = createSelect(
          `${product.id}-${cfg.key}`,
          cfg.label,
          cfg.opts,
          () => updateClassicPrice(product)
        );
        selects.push(label, select);
      }
    });

    // Extras (checkboxes)
    const extrasWrapper = document.createDocumentFragment();
    (product.options.extras || []).forEach(extra => {
      const label = document.createElement("label");
      label.className = "check";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.id = `${product.id}-${extra.id}`;
      cb.addEventListener("change", () => updateClassicPrice(product));

      label.appendChild(cb);
      label.appendChild(document.createTextNode(" " + extra.label));
      extrasWrapper.appendChild(label);
    });

    const price = document.createElement("div");
    price.className = "price";
    price.innerHTML = `₹ <span id="price-${product.id}"></span>`;

    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = "Order Now";
    button.addEventListener("click", () => orderClassic(product));

    card.append(
      img,
      title,
      desc,
      ...selects,
      extrasWrapper,
      price,
      button
    );

    grid.appendChild(card);

    // Initialize price after DOM pieces exist
    updateClassicPrice(product);
  });
}

function renderNanoGrid() {
  const grid = document.getElementById("nanoGrid");
  if (!grid) return;

  nanoProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card simple";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `₹ ${product.price.toLocaleString("en-IN")}`;

    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = "Order Now";
    button.addEventListener("click", () => orderNano(product));

    card.append(img, title, price, button);
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderClassicGrid();
  renderNanoGrid();
});

/* ========= APPLE-STYLE SCROLL REVEAL ========= */

const revealSelector = ".section, .product-card, .review-card";

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  document.querySelectorAll(revealSelector).forEach(el => {
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
