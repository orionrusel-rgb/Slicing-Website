tailwind.config = {
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F5",
        creamDark: "#F3EFEA",
        brandOrange: {
          DEFAULT: "#E8702A",
          hover: "#D15D1B",
          light: "#FDE8D7",
          soft: "#F48C46",
        },
        brandBrown: {
          DEFAULT: "#5E3A24",
          dark: "#3D2415",
          light: "#8C6246",
        },
        ink: "#18181B",
        muted: "#6E6A64",
        lineWarm: "#E6E0D6",
        storyTag: "#3B7A8C",
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
    },
  },
};

// Initialize Lucide Icons
window.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initScrollReveal();
  initScrollProgress();
});

// 1. IntersectionObserver for Scroll-Triggered Reveal Animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealElements.forEach((el) => observer.observe(el));
}

// 2. Top Scroll Progress Bar + Subtle Parallax on Newsletter Banner
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  const navbar = document.getElementById("navbar");
  const newsletterBg = document.getElementById("newsletter-bg");

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + "%";

      // Compact navbar shadow on scroll
      const isScrolled = scrollTop > 20;
      navbar.classList.toggle("is-scrolled", isScrolled);
      if (isScrolled) {
        navbar.classList.add("shadow-sm");
      } else {
        navbar.classList.remove("shadow-sm");
      }

      // Subtle parallax on newsletter image
      if (newsletterBg) {
        const offset = (scrollTop * 0.04) % 24;
        newsletterBg.style.transform = `scale(1.08) translateY(${offset - 12}px)`;
      }
    },
    { passive: true },
  );
}

// 3. Mobile Drawer Toggle
function toggleMobileDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const icon = document.getElementById("mobile-menu-icon");
  if (drawer.classList.contains("hidden")) {
    drawer.classList.remove("hidden");
    icon.setAttribute("data-lucide", "x");
  } else {
    drawer.classList.add("hidden");
    icon.setAttribute("data-lucide", "menu");
  }
  lucide.createIcons();
}

// 4. Interactive Category Filtering for Top Destinations
function filterDestinations(category, btnEl) {
  if (btnEl) {
    document.querySelectorAll(".dest-tab").forEach((tab) => {
      tab.className = "dest-tab hover:text-ink pb-1 transition text-muted";
    });
    btnEl.className =
      "dest-tab text-ink font-bold border-b-2 border-ink pb-1 transition";
  }

  const cards = document.querySelectorAll(".dest-item");
  cards.forEach((card) => {
    const cats = card.getAttribute("data-category");
    card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    if (category === "all" || cats.includes(category)) {
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 20);
    } else {
      card.style.opacity = "0";
      card.style.transform = "scale(0.95)";
      setTimeout(() => {
        card.style.display = "none";
      }, 280);
    }
  });

  document
    .getElementById("destinations-grid")
    .scrollTo({ left: 0, behavior: "smooth" });
}

function scrollDestinations(direction) {
  const track = document.getElementById("destinations-grid");
  const firstVisibleCard = track.querySelector(
    '.dest-item:not([style*="display: none"])',
  );
  if (!firstVisibleCard) return;

  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  track.scrollBy({
    left: direction * (firstVisibleCard.getBoundingClientRect().width + gap),
    behavior: "smooth",
  });
}

function resetAndShowAllDestinations() {
  const firstTab = document.querySelector(".dest-tab");
  filterDestinations("all", firstTab);
  showToast(
    "Semua Destinasi",
    "Menampilkan seluruh destinasi unggulan Indonesia.",
  );
}

// 5. Story Reader Modal
function openStoryModal(tag, title, meta, imgUrl, bodyText) {
  document.getElementById("story-modal-tag").innerText = tag;
  document.getElementById("story-modal-title").innerText = title;
  document.getElementById("story-modal-meta").innerText = meta;
  document.getElementById("story-modal-img").src = imgUrl;
  document.getElementById("story-modal-body").innerText = bodyText;

  const modal = document.getElementById("story-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeStoryModal() {
  const modal = document.getElementById("story-modal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

// 6. Search Modal & Live Filtering
function toggleSearchModal(show) {
  const modal = document.getElementById("search-modal");
  const box = document.getElementById("search-modal-box");
  if (show) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => {
      box.classList.remove("scale-95", "opacity-0");
      box.classList.add("scale-100", "opacity-100");
      document.getElementById("search-input").focus();
    }, 15);
  } else {
    box.classList.remove("scale-100", "opacity-100");
    box.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    }, 180);
  }
}

function runQuickSearch(query) {
  document.getElementById("search-input").value = query;
  toggleSearchModal(false);
  showToast(
    "Pencarian Ditemukan",
    `Menampilkan panduan terbaik untuk "${query}".`,
  );
  document
    .getElementById("destinations")
    .scrollIntoView({ behavior: "smooth" });
}

function filterLiveSearch(val) {
  if (val.length > 2) {
    // Subtle live feedback
  }
}

// 7. Plan Your Trip Modal
function toggleTripModal(show) {
  const modal = document.getElementById("trip-modal");
  if (show) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  } else {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
}

function submitTripPlan(e) {
  e.preventDefault();
  const dest = document.getElementById("trip-dest").value;
  toggleTripModal(false);
  showToast(
    "Rencana Perjalanan Tersimpan!",
    `Itinerary untuk ${dest} telah dikirim ke email Anda.`,
  );
}

// 8. Video Modal
function toggleVideoModal(show) {
  const modal = document.getElementById("video-modal");
  if (show) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  } else {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
}

// 9. Newsletter Subscription
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById("sub-email");
  if (emailInput.value) {
    showToast(
      "Berhasil Berlangganan!",
      `Inspirasi perjalanan Nusantara akan dikirim ke ${emailInput.value}.`,
    );
    emailInput.value = "";
  }
}

// 10. Custom Toast Notification
let toastTimer;
function showToast(title, msg) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-title").innerText = title;
  document.getElementById("toast-msg").innerText = msg;

  clearTimeout(toastTimer);
  toast.classList.remove("translate-y-24", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  toastTimer = setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-24", "opacity-0");
  }, 3600);
}
