/*
  main.js
  - Mobile navigation toggle
  - Active nav highlighting
  - Theme + font-size accessibility toggles (persisted to localStorage)
  - Optional voice navigation (Web Speech API) — lightweight and opt-in
*/

(function () {
  const root = document.documentElement;

  // ---------- Utilities ----------
  const storage = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* ignore */
      }
    }
  };

  function setTheme(theme) {
    // Default CSS is dark. Apply data-theme="light" only for light mode.
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    storage.set("plh_theme", theme);
    const btn = document.querySelector("[data-action='toggle-theme']");
    if (btn) btn.setAttribute("aria-pressed", String(theme !== "light"));
  }

  function setFontMode(mode) {
    if (mode === "lg") root.setAttribute("data-font", "lg");
    else root.removeAttribute("data-font");
    storage.set("plh_font", mode);
    const btn = document.querySelector("[data-action='toggle-font']");
    if (btn) btn.setAttribute("aria-pressed", String(mode === "lg"));
  }

  // ---------- Nav ----------
  const navToggle = document.querySelector("[data-action='toggle-nav']");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // Close mobile menu when a link is clicked
    navLinks.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.tagName === "A" && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Mark current page
  const current = document.body.getAttribute("data-page");
  if (current) {
    const link = document.querySelector(`.nav-links a[data-page='${current}']`);
    if (link) link.setAttribute("aria-current", "page");
  }

  // ---------- Accessibility toggles ----------
  const savedTheme = storage.get("plh_theme", "auto");
  if (savedTheme === "light") setTheme("light");
  else if (savedTheme === "dark") setTheme("dark");
  else {
    // auto mode: respect OS preference (default to dark unless OS prefers light)
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }

  const savedFont = storage.get("plh_font", "md");
  setFontMode(savedFont);

  document.addEventListener("click", (e) => {
    const el = e.target && e.target.closest ? e.target.closest("[data-action]") : null;
    if (!el) return;

    const action = el.getAttribute("data-action");

    if (action === "toggle-theme") {
      const isLight = root.getAttribute("data-theme") === "light";
      setTheme(isLight ? "dark" : "light");
    }

    if (action === "toggle-font") {
      const isLarge = root.getAttribute("data-font") === "lg";
      setFontMode(isLarge ? "md" : "lg");
    }

    if (action === "toggle-voice") {
      toggleVoiceNav(el);
    }
  });

  // ---------- Optional: Voice navigation (opt-in) ----------
  // This uses speech recognition if available (Chrome/Edge). It stays off by default.
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  let voiceEnabled = false;

  function toggleVoiceNav(button) {
    if (!SpeechRecognition) {
      alert("Voice navigation is not supported in this browser.");
      return;
    }

    voiceEnabled = !voiceEnabled;
    button.setAttribute("aria-pressed", String(voiceEnabled));

    if (!voiceEnabled) {
      if (recognition) recognition.stop();
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text = (event.results?.[0]?.[0]?.transcript || "").toLowerCase();
      handleVoiceCommand(text);
    };

    recognition.onerror = () => {
      // Keep it silent; user can toggle off if needed
    };

    recognition.onend = () => {
      // Keep listening while enabled
      if (voiceEnabled) {
        try { recognition.start(); } catch { /* ignore */ }
      }
    };

    try { recognition.start(); } catch { /* ignore */ }
  }

  function handleVoiceCommand(text) {
    // Minimal mapping. Keep it simple and predictable.
    const map = [
      { key: "home", page: "home" },
      { key: "domain", page: "domain" },
      { key: "milestones", page: "milestones" },
      { key: "documents", page: "documents" },
      { key: "presentations", page: "presentations" },
      { key: "about", page: "about" },
      { key: "contact", page: "contact" }
    ];

    const match = map.find(m => text.includes(m.key));
    if (!match) return;

    const link = document.querySelector(`.nav-links a[data-page='${match.page}']`);
    if (link) link.click();
  }

  // ---------- Contact form (client-side) ----------
  const form = document.querySelector("form[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name")?.value?.trim() || "";
      const email = form.querySelector("#email")?.value?.trim() || "";
      const message = form.querySelector("#message")?.value?.trim() || "";

      if (!name || !email || !message) {
        showFormStatus(form, "Please fill in all fields.", "warn");
        return;
      }

      // Basic email check (lightweight)
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        showFormStatus(form, "Please enter a valid email address.", "warn");
        return;
      }

      // No backend in this static site. Provide a mailto fallback.
      const to = form.getAttribute("data-to") || "research@university.edu";
      const subject = encodeURIComponent("Personalized Learning Hub — Contact");
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      showFormStatus(form, "Opening your email client…", "good");

      // Let user keep a copy of their message (non-destructive)
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

  function showFormStatus(formEl, text, kind) {
    let box = formEl.querySelector("[data-form-status]");
    if (!box) {
      box = document.createElement("div");
      box.className = "notice";
      box.setAttribute("data-form-status", "");
      box.setAttribute("role", "status");
      box.setAttribute("aria-live", "polite");
      formEl.prepend(box);
    }

    box.textContent = text;

    // Subtle styling hook
    box.style.borderColor = kind === "good" ? "color-mix(in srgb, #15803d 40%, var(--border))"
      : kind === "warn" ? "color-mix(in srgb, #b45309 40%, var(--border))"
      : "var(--border)";
  }
})();
