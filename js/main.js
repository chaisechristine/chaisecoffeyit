/* =========================
   Main JS (Dark mode, mobile drawer,
   typing effect, skill bars animation)
   ========================= */

(function () {
  const body = document.body;

  // ----- Dark mode (persist) -----
  const savedTheme = localStorage.getItem("ccc-theme");
  if (savedTheme === "dark") body.classList.add("dark");

  const themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      localStorage.setItem("ccc-theme", body.classList.contains("dark") ? "dark" : "light");
    });
  }

  // ----- Mobile drawer -----
  const drawer = document.querySelector("#drawer");
  const openBtn = document.querySelector("[data-drawer-open]");
  const closeBtn = document.querySelector("[data-drawer-close]");
  const backdrop = document.querySelector("[data-drawer-backdrop]");

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove("open");
    document.documentElement.style.overflow = "";
  };

  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  // Close drawer after clicking a link
  if (drawer) {
    drawer.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", closeDrawer);
    });
  }

  // ----- Typing effect (home page only if element exists) -----
  const typeEl = document.querySelector("[data-typewriter]");
  if (typeEl) {
    const text = typeEl.getAttribute("data-typewriter") || "";
    const speed = 22; // typing speed
    let i = 0;

    // Prevent “cut off” by keeping layout stable:
    // (CSS already sets min-height and no overflow hidden.)
    const tick = () => {
      typeEl.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) setTimeout(tick, speed);
    };
    tick();
  }

  // ----- Skill bars animate when visible -----
  const fills = document.querySelectorAll("[data-skill]");
  if (fills.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const pct = el.getAttribute("data-skill") || "0";
        el.style.width = pct + "%";
        io.unobserve(el);
      });
    }, { threshold: 0.25 });

    fills.forEach(el => io.observe(el));
  }

})();