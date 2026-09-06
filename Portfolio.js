 /* ============================================================
   PORTFOLIO.JS — behaviour for the SPA-style portfolio
   Sections: Router | Theme | Nav | Typed roles | Skills |
             Projects (filter/search/modal) | Global search |
             Contact form
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Router ---------- */
  const PAGES = ["home", "about", "skills", "projects", "experience", "resume", "contact"];
  const views = {};
  const navLinks = {};

  function initRouter() {
    PAGES.forEach((p) => {
      views[p] = document.querySelector(`[data-page="${p}"]`);
    });
    document.querySelectorAll(".nav-links a[data-route]").forEach((a) => {
      navLinks[a.dataset.route] = a;
      a.addEventListener("click", () => closeMobileNav());
    });
    window.addEventListener("hashchange", renderRoute);
    renderRoute();
  }

  function currentRoute() {
    const hash = (window.location.hash || "#home").replace("#", "");
    return PAGES.includes(hash) ? hash : "home";
  }

  function renderRoute() {
    const route = currentRoute();
    PAGES.forEach((p) => {
      if (!views[p]) return;
      views[p].classList.toggle("active", p === route);
    });
    Object.entries(navLinks).forEach(([route_, link]) => {
      link.classList.toggle("active", route_ === route);
      if (route_ === route) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    const heading = views[route] ? views[route].querySelector("h1,h2") : null;
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    document.title = route === "home"
      ? "Tarun Kumar | Full Stack Developer"
      : `${route.charAt(0).toUpperCase() + route.slice(1)} | Tarun Kumar`;
  }

  function goTo(route) {
    window.location.hash = `#${route}`;
  }
  window.goTo = goTo;

  /* ---------- Mobile nav ---------- */
  function closeMobileNav() {
    document.querySelector(".nav-links")?.classList.remove("open");
    document.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "false");
  }

  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function safeMatchMedia(query) {
    if (typeof window.matchMedia === "function") return window.matchMedia(query);
    return { matches: false };
  }

  /* ---------- Theme ---------- */
  function safeStorage() {
    try {
      const testKey = "__test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch (e) {
      return { getItem: () => null, setItem: () => {} };
    }
  }

  function initTheme() {
    const storage = safeStorage();
    const stored = storage.getItem("theme");
    const prefersDark = safeMatchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark-mode" : prefersDark;
    document.body.classList.toggle("dark-mode", dark);
    updateThemeButton(dark);

    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        storage.setItem("theme", isDark ? "dark-mode" : "light-mode");
        updateThemeButton(isDark);
      });
    });
  }

  function updateThemeButton(isDark) {
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.textContent = isDark ? "☀️" : "🌙";
      btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  /* ---------- Typed roles ---------- */
  function initTypedRoles() {
    const el = document.getElementById("roleText");
    if (!el || typeof ROLES === "undefined") return;
    if (safeMatchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = ROLES[0];
      return;
    }
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const word = ROLES[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          return setTimeout(tick, 1400);
        }
      } else {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 80);
    }
    tick();
  }

  /* ---------- Highlight helper ---------- */
  function highlight(text, query) {
    if (!query) return text;
    const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.replace(new RegExp(`(${safe})`, "ig"), "<mark>$1</mark>");
  }

  /* ---------- Skills ---------- */
  let activeSkillCategory = "all";
  let skillQuery = "";

  function initSkills() {
    const filterBar = document.getElementById("skillFilters");
    if (!filterBar || typeof SKILL_CATEGORIES === "undefined") return;

    filterBar.innerHTML = `<button class="chip active" data-cat="all">All</button>` +
      SKILL_CATEGORIES.map((c) => `<button class="chip" data-cat="${c.id}">${c.label}</button>`).join("");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      activeSkillCategory = btn.dataset.cat;
      filterBar.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === btn));
      renderSkills();
    });

    const searchInput = document.getElementById("skillSearch");
    const clearBtn = document.getElementById("skillSearchClear");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        skillQuery = searchInput.value.trim();
        clearBtn.classList.toggle("show", !!skillQuery);
        renderSkills();
      });
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        skillQuery = "";
        clearBtn.classList.remove("show");
        searchInput.focus();
        renderSkills();
      });
    }
    renderSkills();
  }

  function renderSkills() {
    const container = document.getElementById("skillsContainer");
    if (!container) return;
    const q = skillQuery.toLowerCase();

    let categories = SKILL_CATEGORIES;
    if (activeSkillCategory !== "all") categories = categories.filter((c) => c.id === activeSkillCategory);

    let html = "";
    let total = 0;
    categories.forEach((cat) => {
      const items = SKILLS.filter((s) => s.category === cat.id && (!q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)));
      if (!items.length) return;
      total += items.length;
      html += `<h3 class="skill-category-heading">${cat.label} <span class="count">${items.length}</span></h3>`;
      html += `<div class="skills-grid">` + items.map((s) => `
        <div class="skill-card">
          <span class="glyph">${s.icon}</span>
          <div>
            <h4>${highlight(s.name, q)}</h4>
            <p>${highlight(s.desc, q)}</p>
          </div>
        </div>`).join("") + `</div>`;
    });

    container.innerHTML = total ? html : `
      <div class="empty-state">
        <span class="glyph">🔍</span>
        <p>No skills found${q ? ` for "${q}"` : ""}. Try a different search or category.</p>
      </div>`;
  }

  /* ---------- Projects ---------- */
  let activeProjectCategory = "All";
  let projectQuery = "";

  function initProjects() {
    if (typeof PROJECTS === "undefined") return;
    const filterBar = document.getElementById("projectFilters");
    if (filterBar) {
      filterBar.innerHTML = PROJECT_CATEGORIES.map((c) =>
        `<button class="chip ${c === "All" ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
      filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".chip");
        if (!btn) return;
        activeProjectCategory = btn.dataset.cat;
        filterBar.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === btn));
        renderProjects();
      });
    }

    const searchInput = document.getElementById("projectSearch");
    const clearBtn = document.getElementById("projectSearchClear");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        projectQuery = searchInput.value.trim();
        clearBtn.classList.toggle("show", !!projectQuery);
        renderProjects();
      });
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        projectQuery = "";
        clearBtn.classList.remove("show");
        searchInput.focus();
        renderProjects();
      });
    }

    document.getElementById("projectsGrid")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-details]");
      if (btn) openProjectModal(btn.dataset.details);
    });

    document.getElementById("projectModalOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "projectModalOverlay") closeProjectModal();
    });
    document.getElementById("projectModalClose")?.addEventListener("click", closeProjectModal);

    renderProjects();
  }

  function matchesProjectQuery(p, q) {
    if (!q) return true;
    const hay = [p.title, p.description, p.category, ...(p.tech || [])].join(" ").toLowerCase();
    return hay.includes(q);
  }

  function renderProjects() {
    const grid = document.getElementById("projectsGrid");
    const countEl = document.getElementById("projectResultCount");
    if (!grid) return;
    const q = projectQuery.toLowerCase();

    const filtered = PROJECTS.filter((p) =>
      (activeProjectCategory === "All" || p.category === activeProjectCategory) &&
      matchesProjectQuery(p, q)
    );

    if (countEl) countEl.textContent = `${filtered.length} project${filtered.length === 1 ? "" : "s"} found`;

    grid.innerHTML = filtered.length ? filtered.map((p) => `
      <article class="project-card">
        <div class="project-thumb"><img src="${p.icon}" alt="" loading="lazy"></div>
        <div class="project-body">
          <span class="project-cat-tag">${p.category}</span>
          <h3 class="project-title">${highlight(p.title, q)}</h3>
          <p class="project-desc">${highlight(p.description, q)}</p>
          <div class="tech-tags">${p.tech.map((t) => `<span class="tech-tag">${highlight(t, q)}</span>`).join("")}</div>
          <div class="project-actions">
            ${p.links.map((l) => `<a class="btn btn-outline btn-sm" href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("")}
            <button class="btn btn-primary btn-sm" data-details="${p.id}">View Details</button>
          </div>
        </div>
      </article>`).join("") : `
      <div class="empty-state" style="grid-column:1/-1">
        <span class="glyph">🗂️</span>
        <p>No projects found${q ? ` for "${q}"` : ""}. Try clearing filters or the search box.</p>
      </div>`;
  }

  function openProjectModal(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    document.getElementById("projectModalTitle").textContent = p.title;
    let html = `
      <h5>Overview</h5>
      <p>${p.description}</p>
      <h5>Category</h5>
      <p>${p.category}</p>
      <h5>Technologies</h5>
      <div class="tech-tags">${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>`;
    if (p.demoCredentials) {
      html += `<h5>Demo Credentials</h5>
        <div class="demo-cred-box">email: ${p.demoCredentials.email}<br>password: ${p.demoCredentials.password}</div>`;
    }
    html += `<h5>Links</h5>
      <div class="project-actions">${p.links.map((l) => `<a class="btn btn-primary btn-sm" href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("")}</div>`;
    document.getElementById("projectModalBody").innerHTML = html;
    document.getElementById("projectModalOverlay").classList.add("open");
    document.getElementById("projectModalClose").focus();
    document.addEventListener("keydown", escCloseProjectModal);
  }

  function closeProjectModal() {
    document.getElementById("projectModalOverlay")?.classList.remove("open");
    document.removeEventListener("keydown", escCloseProjectModal);
  }
  function escCloseProjectModal(e) {
    if (e.key === "Escape") closeProjectModal();
  }

  /* ---------- Global search palette ---------- */
  let searchFocusIndex = -1;

  function buildSearchIndex() {
    const index = [];
    (typeof PROJECTS !== "undefined" ? PROJECTS : []).forEach((p) => {
      index.push({
        type: "Project", icon: "🗂️", title: p.title,
        sub: p.category, route: "projects",
        haystack: [p.title, p.description, p.category, ...(p.tech || [])].join(" ").toLowerCase(),
        onSelect: () => { goTo("projects"); setTimeout(() => openProjectModal(p.id), 60); },
      });
    });
    (typeof SKILLS !== "undefined" ? SKILLS : []).forEach((s) => {
      index.push({
        type: "Skill", icon: s.icon, title: s.name,
        sub: SKILL_CATEGORIES.find((c) => c.id === s.category)?.label || "",
        route: "skills",
        haystack: [s.name, s.desc, s.category].join(" ").toLowerCase(),
        onSelect: () => goTo("skills"),
      });
    });
    if (typeof ABOUT_CONTENT !== "undefined") {
      index.push({
        type: "About", icon: "👨‍💻", title: "About Tarun",
        sub: ABOUT_CONTENT.education.degree, route: "about",
        haystack: [ABOUT_CONTENT.intro, ABOUT_CONTENT.education.degree, ABOUT_CONTENT.education.school, ABOUT_CONTENT.goal].join(" ").toLowerCase(),
        onSelect: () => goTo("about"),
      });
      index.push({
        type: "Experience", icon: "🎓", title: ABOUT_CONTENT.education.degree,
        sub: ABOUT_CONTENT.education.school, route: "experience",
        haystack: [ABOUT_CONTENT.education.degree, ABOUT_CONTENT.education.school].join(" ").toLowerCase(),
        onSelect: () => goTo("experience"),
      });
    }
    index.push({
      type: "Page", icon: "📄", title: "Resume", sub: "View or download my resume",
      route: "resume", haystack: "resume cv download pdf",
      onSelect: () => goTo("resume"),
    });
    index.push({
      type: "Page", icon: "📧", title: "Contact", sub: "Get in touch",
      route: "contact", haystack: "contact email message form",
      onSelect: () => goTo("contact"),
    });
    return index;
  }

  function initGlobalSearch() {
    const index = buildSearchIndex();
    const overlay = document.getElementById("searchOverlay");
    const input = document.getElementById("globalSearchInput");
    const results = document.getElementById("searchResults");
    const clearBtn = document.getElementById("searchClearBtn");
    if (!overlay || !input || !results) return;

    function open() {
      overlay.classList.add("open");
      input.value = "";
      clearBtn.classList.remove("show");
      searchFocusIndex = -1;
      renderResults("");
      setTimeout(() => input.focus(), 30);
      document.addEventListener("keydown", onKeydown);
    }
    function close() {
      overlay.classList.remove("open");
      document.removeEventListener("keydown", onKeydown);
    }

    function renderResults(q) {
      if (!q) {
        results.innerHTML = `<div class="search-hint">Search projects, skills, about, experience… try "React", "MERN", or "AR/VR".</div>`;
        return;
      }
      const qq = q.toLowerCase();
      const matches = index.filter((item) => item.haystack.includes(qq)).slice(0, 30);
      if (!matches.length) {
        results.innerHTML = `<div class="search-empty">No results found for "<strong>${q}</strong>". Try a different term.</div>`;
        return;
      }
      const groups = {};
      matches.forEach((m) => { (groups[m.type] = groups[m.type] || []).push(m); });
      results.innerHTML = Object.entries(groups).map(([type, items]) => `
        <div class="search-group-label">${type}${items.length > 1 ? "s" : ""}</div>
        ${items.map((m, i) => `
          <div class="search-result" role="option" tabindex="-1" data-idx="${index.indexOf(m)}">
            <span class="r-icon">${m.icon}</span>
            <div>
              <div class="r-title">${highlight(m.title, q)}</div>
              <div class="r-sub">${m.sub}</div>
            </div>
          </div>`).join("")}
      `).join("");

      results.querySelectorAll(".search-result").forEach((el) => {
        el.addEventListener("click", () => {
          const item = index[parseInt(el.dataset.idx, 10)];
          close();
          item.onSelect();
        });
      });
    }

    input.addEventListener("input", () => {
      clearBtn.classList.toggle("show", !!input.value);
      searchFocusIndex = -1;
      renderResults(input.value.trim());
    });
    clearBtn.addEventListener("click", () => { input.value = ""; clearBtn.classList.remove("show"); renderResults(""); input.focus(); });

    function onKeydown(e) {
      const items = Array.from(results.querySelectorAll(".search-result"));
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        searchFocusIndex = Math.min(searchFocusIndex + 1, items.length - 1);
        updateFocus(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        searchFocusIndex = Math.max(searchFocusIndex - 1, 0);
        updateFocus(items);
      } else if (e.key === "Enter" && searchFocusIndex >= 0 && items[searchFocusIndex]) {
        items[searchFocusIndex].click();
      }
    }
    function updateFocus(items) {
      items.forEach((el, i) => el.classList.toggle("focused", i === searchFocusIndex));
      items[searchFocusIndex]?.scrollIntoView({ block: "nearest" });
    }

    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    document.querySelectorAll("[data-search-open]").forEach((btn) => btn.addEventListener("click", open));

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
      }
    });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const status = document.getElementById("formStatus");
    const submitBtn = document.getElementById("contactSubmitBtn");

    const rules = {
      name: (v) => v.trim().length >= 2 || "Please enter your name.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Please enter a valid email address.",
      phone: (v) => /^[+\d][\d\s-]{7,}$/.test(v) || "Please enter a valid phone number.",
      subject: (v) => v.trim().length >= 3 || "Please enter a subject.",
      message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
    };

    function validateField(field) {
      const rule = rules[field.name];
      if (!rule) return true;
      const result = rule(field.value);
      const wrapper = field.closest(".field");
      const errorEl = wrapper.querySelector(".field-error");
      if (result === true) {
        wrapper.classList.remove("invalid");
        return true;
      }
      wrapper.classList.add("invalid");
      if (errorEl) errorEl.textContent = result;
      return false;
    }

    Object.keys(rules).forEach((name) => {
      const field = form.elements[name];
      if (field) field.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      Object.keys(rules).forEach((name) => {
        const field = form.elements[name];
        if (field && !validateField(field)) valid = false;
      });
      status.classList.remove("show", "success", "error");
      if (!valid) {
        status.textContent = "Please fix the highlighted fields and try again.";
        status.classList.add("show", "error");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner"></span> Sending…`;

      try {
        const response = await fetch(form.action, { method: form.method, body: new FormData(form) });
        const result = await response.json();
        if (result.success) {
          status.textContent = "✅ Message sent successfully! I'll get back to you soon.";
          status.classList.add("show", "success");
          form.reset();
        } else {
          status.textContent = "❌ Something went wrong sending your message. Please try again.";
          status.classList.add("show", "error");
        }
      } catch (err) {
        status.textContent = "❌ Network error. Please check your connection and try again.";
        status.classList.add("show", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileNav();
    initRouter();
    initTypedRoles();
    initSkills();
    initProjects();
    initGlobalSearch();
    initContactForm();
    console.log("🚀 Portfolio loaded — upgraded SPA build");
    console.log("👨‍💻 Developed by Tarun Kumar");
  });
})();
