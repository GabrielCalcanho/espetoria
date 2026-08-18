/**
 * Espetoria — Main JavaScript
 * Parallax, reveal, lightbox, menu
 */
(function () {
  "use strict";

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scroll
  const nav = document.getElementById("mainNav");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Close mobile menu on link click
  const navCollapse = document.getElementById("navbarNav");
  if (navCollapse) {
    navCollapse.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse && window.innerWidth < 992) bsCollapse.hide();
      });
    });
  }

  // Subtle parallax on hero
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          if (scrolled < window.innerHeight * 1.2) {
            heroBg.style.transform = `translate3d(0, ${scrolled * 0.28}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    if (lightboxImg) lightboxImg.src = "";
  }

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const cap = item.querySelector("figcaption");
      if (img) openLightbox(img.src, img.alt, cap ? cap.textContent : "");
    });
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // ========== Menu ==========
  const categoriesEl = document.getElementById("menuCategories");
  const itemsEl = document.getElementById("menuItems");
  const searchInput = document.getElementById("menuSearch");

  if (!categoriesEl || !itemsEl || typeof MENU_DATA === "undefined") return;

  let activeCategory = "all";
  let searchQuery = "";

  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function renderCategories() {
    categoriesEl.innerHTML = "";
    const allBtn = document.createElement("button");
    allBtn.type = "button";
    allBtn.className = "menu-cat-btn active";
    allBtn.dataset.category = "all";
    allBtn.textContent = "Todos";
    allBtn.setAttribute("role", "tab");
    allBtn.setAttribute("aria-selected", "true");
    categoriesEl.appendChild(allBtn);

    MENU_DATA.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "menu-cat-btn";
      btn.dataset.category = cat.id;
      btn.textContent = cat.name;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", "false");
      categoriesEl.appendChild(btn);
    });

    categoriesEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".menu-cat-btn");
      if (!btn) return;
      activeCategory = btn.dataset.category;
      categoriesEl.querySelectorAll(".menu-cat-btn").forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-selected", isActive ? "true" : "false");
      });
      // Scroll active button into view on mobile
      btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      renderItems();
    });
  }

  function matchesSearch(item, query) {
    if (!query) return true;
    const q = normalize(query);
    return (
      normalize(item.name).includes(q) ||
      (item.meta && normalize(item.meta).includes(q))
    );
  }

  function renderItems() {
    itemsEl.innerHTML = "";
    let hasResults = false;

    MENU_DATA.forEach((cat) => {
      if (activeCategory !== "all" && activeCategory !== cat.id) return;

      const filtered = cat.items.filter((item) => matchesSearch(item, searchQuery));
      if (filtered.length === 0) return;

      hasResults = true;

      const block = document.createElement("div");
      block.className = "menu-category-block";
      block.dataset.category = cat.id;

      const title = document.createElement("h3");
      title.className = "menu-category-title";
      title.textContent = cat.name;
      block.appendChild(title);

      if (cat.note) {
        const note = document.createElement("p");
        note.className = "menu-category-note";
        note.textContent = cat.note;
        block.appendChild(note);
      }

      const hr = document.createElement("hr");
      block.appendChild(hr);

      filtered.forEach((item) => {
        const row = document.createElement("div");
        row.className = "menu-item" + (item.price ? " has-price" : "");

        const nameSpan = document.createElement("span");
        nameSpan.className = "menu-item-name";
        nameSpan.textContent = item.name;
        if (item.meta) {
          const meta = document.createElement("span");
          meta.className = "menu-item-meta";
          meta.textContent = "  ·  " + item.meta;
          nameSpan.appendChild(meta);
        }
        row.appendChild(nameSpan);

        if (item.price) {
          const priceSpan = document.createElement("span");
          priceSpan.className = "menu-item-price";
          priceSpan.textContent = item.price;
          row.appendChild(priceSpan);
        }

        block.appendChild(row);
      });

      itemsEl.appendChild(block);
    });

    if (!hasResults) {
      const empty = document.createElement("p");
      empty.className = "menu-empty";
      empty.textContent = "Nenhum item encontrado.";
      itemsEl.appendChild(empty);
    }
  }

  if (searchInput) {
    let debounce;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = searchInput.value.trim();
        renderItems();
      }, 140);
    });
  }

  renderCategories();
  renderItems();
})();
