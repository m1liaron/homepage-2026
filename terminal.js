/*  COMMAND PALETTE  —  command-palette.js
   Open with:  `  /  Win+R  /  Cmd+K  /  Ctrl+K */

(() => {
  "use strict";

  const SECRET_TEXT = `You've probably seen that I've joined Binary Studio Academy twice, and yes, I failed twice make it to the project stage. But I haven't given up, so this summer I will push my limits to the edge to get that offer and join the Binary Studio team!`;
  const rusorizURL = "https://send.monobank.ua/jar/2JbpBYkhMv";
    
  /* ── Anime quotes pool ── */
  const ANIME_QUOTES = [
    {
      text: "The world isn't perfect. But it's there for us, doing the best it can. That's what makes it so damn beautiful.",
      src: "Roy Mustang — Fullmetal Alchemist",
    },
    {
      text: "If you don't take risks, you can't create a future.",
      src: "Monkey D. Luffy — One Piece",
    },
    {
      text: "It's not the face that makes someone a monster. It's the choices they make with their lives.",
      src: "Naruto Uzumaki — Naruto",
    },
    {
      text: "Fear is not evil. It tells you what your weakness is. And once you know your weakness, you can become stronger as well as kinder.",
      src: "Gildarts Clive — Fairy Tail",
    },
    {
      text: "Knowing what it feels to be in pain is exactly why we try to be kind to others.",
      src: "Jiraiya — Naruto",
    },
    {
      text: "A dropout will beat a genius through hard work.",
      src: "Rock Lee — Naruto",
    },
    {
      text: "No matter how deep the night, it always turns to day eventually.",
      src: "Brook — One Piece",
    },
    {
      text: "If you can't find a reason to fight, then you shouldn't be fighting.",
      src: "Akame — Akame ga Kill",
    },
    {
      text: "The only things that can kill a bad dream are a new dream.",
      src: "Nietzsche, via Monster",
    },
    {
      text: "Hard work betrays none, but dreams betray many.",
      src: "Hachiman Hikigaya — OreGairu",
    },
    {
      text: "People's lives don't end when they die. It ends when they lose faith.",
      src: "Itachi Uchiha — Naruto",
    },
    {
      text: "The world is not beautiful; therefore, it is.",
      src: "Kino — Kino's Journey",
    },
    {
      text: "Don't give up. There's no shame in falling. The shame is in not getting up.",
      src: "Shintaro Midorima — Kuroko no Basket",
    },
    {
      text: "Whatever you lose, you'll find it again. But what you throw away, you'll never get back.",
      src: "Himura Kenshin — Rurouni Kenshin",
    },
    {
      text: "Sometimes the things that matter the most are right in front of you.",
      src: "Asuna — Sword Art Online",
    },
  ];

  /* ── Items definition ── */
  const ITEMS = [
    {
      id: "projects",
      icon: "📁",
      label: "Open Projects",
      desc: "Jump to experience section",
      short: "P",
      action: () => {
        close();
        setTimeout(() => {
          const el = document.getElementById("experience");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 180);
      },
    },
    {
      id: "contact",
      icon: "📬",
      label: "Contact",
      desc: "Open LinkedIn profile",
      short: "C",
      action: () => {
        close();
        window.open(
          "https://www.linkedin.com/in/matveichenko-vladislav-71192a303",
          "_blank",
        );
      },
    },
    {
      id: "quote",
      icon: "🎌",
      label: "Random Anime Quote",
      desc: "Get inspired",
      short: "Q",
      action: () => showQuote(),
    },
    {
      id: "rusoriz",
      icon: "💵",
      label: "Rusoriz",
      desc: "Sh....",
      short: "Q",
      action: () => showRusoriz(),
    },
    {
      id: "print",
      icon: "🖨️",
      label: "Print / Save CV",
      desc: "Export as PDF",
      short: "D",
      action: () => {
        close();
        setTimeout(() => window.print(), 250);
      },
    },
    {
      id: "egg",
      icon: "🥚",
      label: "Easter Egg",
      desc: "You found something...",
      short: "E",
      action: () => triggerEasterEgg(),
    },
    {
      id: "secret",
      icon: "🕵️‍♀️",
      label: "Secret",
      desc: "Oh, secret...",
      short: "S",
      action: () => showSecret(),
    },
  ];

  /* ── Build DOM ── */
  function buildDOM() {
    /* Overlay */
    const overlay = document.createElement("div");
    overlay.className = "cmd-overlay";
    overlay.id = "cmd-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Command palette");

    overlay.innerHTML = `
      <div class="cmd-terminal" id="cmd-terminal">
        <div class="cmd-titlebar">
          <div class="cmd-dot red"   title="Close"   id="cmd-dot-close"></div>
          <div class="cmd-dot yellow" title="—"></div>
          <div class="cmd-dot green"  title="—"></div>
          <span class="cmd-titlebar-label">resume.exe — command mode</span>
        </div>

        <div class="cmd-input-row">
          <span class="cmd-prompt">❯&nbsp;</span>
          <input
            class="cmd-input"
            id="cmd-input"
            type="text"
            placeholder="type a command…"
            autocomplete="off"
            spellcheck="false"
          />
          <span class="cmd-kbd-hint">esc to close</span>
        </div>

        <ul class="cmd-list" id="cmd-list" role="listbox">
          ${ITEMS.map(
            (item, i) => `
            <li
              class="cmd-item${i === 0 ? " active" : ""}"
              data-index="${i}"
              data-id="${item.id}"
              role="option"
              aria-selected="${i === 0}"
              tabindex="-1"
            >
              <span class="cmd-item-arrow">▶</span>
              <span class="cmd-item-icon">${item.icon}</span>
              <span class="cmd-item-body">
                <span class="cmd-item-label">${item.label}</span>
                <span class="cmd-item-desc">${item.desc}</span>
              </span>
              <span class="cmd-item-shortcut">${item.short}</span>
            </li>
          `,
          ).join("")}
        </ul>

        <div class="cmd-result" id="cmd-result">
          <div class="cmd-result-text" id="cmd-result-text"></div>
          <div class="cmd-result-source" id="cmd-result-source"></div>
        </div>

        <div class="cmd-footer">
          <span class="cmd-footer-hint"><kbd>↑↓</kbd> navigate</span>
          <span class="cmd-footer-hint"><kbd>↵</kbd> select</span>
          <span class="cmd-footer-hint"><kbd>\`</kbd> <kbd>⌘K</kbd> <kbd>Win+R</kbd> toggle</span>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    /* Easter egg canvas */
    const canvas = document.createElement("canvas");
    canvas.id = "cmd-egg-canvas";
    document.body.appendChild(canvas);
  }

  /* ── State ── */
  let activeIndex = 0;
  let isOpen = false;

  const getOverlay = () => document.getElementById("cmd-overlay");
  const getInput = () => document.getElementById("cmd-input");
  const getList = () => document.getElementById("cmd-list");
  const getItems = () => [
    ...document.querySelectorAll(".cmd-item:not(.hidden)"),
  ];
  const getResult = () => document.getElementById("cmd-result");
  const getResultTx = () => document.getElementById("cmd-result-text");
  const getResultSrc = () => document.getElementById("cmd-result-source");

  /* ── Open / Close ── */
  function open() {
    if (isOpen) return;
    isOpen = true;
    getOverlay().classList.add("open");
    resetResult();
    renderItems("");
    setActive(0);
    setTimeout(() => getInput().focus(), 50);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    getOverlay().classList.remove("open");
    getInput().value = "";
    resetResult();
  }

  function toggle() {
    isOpen ? close() : open();
  }

  /* ── Render / filter items ── */
  function renderItems(query) {
    const q = query.trim().toLowerCase();
    const listItems = getList().querySelectorAll(".cmd-item");
    listItems.forEach((li) => {
      const label = ITEMS[+li.dataset.index].label.toLowerCase();
      const desc = ITEMS[+li.dataset.index].desc.toLowerCase();
      li.classList.toggle(
        "hidden",
        !!q && !label.includes(q) && !desc.includes(q),
      );
    });
    setActive(0);
  }

  /* ── Active item ── */
  function setActive(idx) {
    const visible = getItems();
    if (!visible.length) return;
    activeIndex = Math.max(0, Math.min(idx, visible.length - 1));
    visible.forEach((li, i) => {
      li.classList.toggle("active", i === activeIndex);
      li.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
    });
  }

  function moveActive(dir) {
    const visible = getItems();
    setActive(
      activeIndex + dir < 0
        ? visible.length - 1
        : (activeIndex + dir) % visible.length,
    );
  }

  /* ── Execute ── */
  function execute() {
    const visible = getItems();
    if (!visible.length) return;
    const li = visible[activeIndex];
    const item = ITEMS[+li.dataset.index];
    item.action();
  }

  /* ── Anime quote ── */
  function showQuote() {
    const q = ANIME_QUOTES[Math.floor(Math.random() * ANIME_QUOTES.length)];
    const res = getResult();
    const tx = getResultTx();
    const src = getResultSrc();
    tx.textContent = `"${q.text}"`;
    src.textContent = `— ${q.src}`;
    res.classList.add("visible");
    /* Re-clicking refreshes */
    const quoteItem = [...getList().querySelectorAll(".cmd-item")].find(
      (li) => ITEMS[+li.dataset.index].id === "quote",
    );
    if (quoteItem) {
      const label = quoteItem.querySelector(".cmd-item-desc");
      label.textContent = "click again for another ✦";
    }
  }
    
  function showSecret() {
      const tx = getResultTx();
      const res = getResult();
      tx.textContent = SECRET_TEXT;
      res.classList.add("visible");
  }
    
  function showRusoriz() {
      const tx = getResultTx();
      const res = getResult();
      const newUrl = document.createElement("a");
      newUrl.href = rusorizURL;
      newUrl.textContent = "Donate!!!!!";
      res.classList.add("visible");

    console.log([...tx.children])
      if ([...tx.children].some(el => el.tagName === "A")) {
          tx.querySelector("a").remove()
      } else {
          tx.append(newUrl);
      }
  }

  function resetResult() {
    getResult().classList.remove("visible");
    const quoteItem = [
      ...(getList()?.querySelectorAll(".cmd-item") || []),
    ].find((li) => ITEMS[+li.dataset.index]?.id === "quote");
    if (quoteItem)
      quoteItem.querySelector(".cmd-item-desc").textContent = ITEMS.find(
        (i) => i.id === "quote",
      ).desc;
  }

  /* ── Easter egg: Matrix katakana rain ── */
  function triggerEasterEgg() {
    close();
    const canvas = document.getElementById("cmd-egg-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.classList.add("active");

    const CHARS =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const COL_W = 18;
    const cols = Math.floor(canvas.width / COL_W);
    const drops = Array.from({ length: cols }, () => Math.random() * -80);

    let frame = 0;
    let rafId;

    function draw() {
      ctx.fillStyle = "rgba(14, 12, 9, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${COL_W - 2}px 'DM Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * COL_W;

        /* Lead char is bright gold */
        ctx.fillStyle = "#e8c96d";
        ctx.fillText(char, i * COL_W, y);

        /* Trail */
        ctx.fillStyle = "rgba(100, 80, 30, 0.7)";
        ctx.fillText(
          CHARS[Math.floor(Math.random() * CHARS.length)],
          i * COL_W,
          y - COL_W,
        );

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.6;
      }

      /* Show message after ~2s */
      if (frame > 80) {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        ctx.fillStyle = "rgba(14,12,9,.75)";
        ctx.fillRect(cx - 280, cy - 60, 560, 120);
        ctx.strokeStyle = "#c9a84c";
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 280, cy - 60, 560, 120);

        ctx.fillStyle = "#e8c96d";
        ctx.font = "bold 22px 'Cormorant Garamond', serif";
        ctx.textAlign = "center";
        ctx.fillText("SENPAI NOTICED YOUR RESUME", cx, cy - 12);

        ctx.fillStyle = "#a09070";
        ctx.font = "13px 'DM Mono', monospace";
        ctx.fillText(
          "> hire.vladislav() // returns Promise<offer>",
          cx,
          cy + 18,
        );

        ctx.fillStyle = "#4a3820";
        ctx.font = "10px 'DM Mono', monospace";
        ctx.fillText("press any key to exit", cx, cy + 48);
        ctx.textAlign = "start";
      }

      frame++;
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    function stopEgg() {
      cancelAnimationFrame(rafId);
      canvas.classList.remove("active");
      setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 400);
      document.removeEventListener("keydown", stopEgg);
      canvas.removeEventListener("click", stopEgg);
    }

    setTimeout(() => {
      document.addEventListener("keydown", stopEgg);
      canvas.addEventListener("click", stopEgg);
      canvas.style.pointerEvents = "all";
    }, 800);
  }

  /* ── Event listeners ── */
  function initEvents() {
    /* Global keyboard shortcut */
    document.addEventListener("keydown", (e) => {
      const ctrl = e.ctrlKey || e.metaKey;

      if (
        e.key === "`" /* backtick */ ||
        (ctrl && e.key === "k") /* Cmd/Ctrl + K */ ||
        (e.key === "r" &&
          e.getModifierState /* Win + R (meta on Windows) */ &&
          e.metaKey &&
          !e.ctrlKey &&
          !e.altKey)
      ) {
        e.preventDefault();
        toggle();
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "ArrowDown":
          e.preventDefault();
          moveActive(+1);
          break;
        case "ArrowUp":
          e.preventDefault();
          moveActive(-1);
          break;
        case "Enter":
          e.preventDefault();
          execute();
          break;

        /* Shortcut keys while palette open */
        case "p":
        case "P":
          runById("projects");
          break;
        case "c":
        case "C":
          runById("contact");
          break;
        case "q":
        case "Q":
          runById("quote");
          break;
        case "d":
        case "D":
          runById("print");
          break;
        case "e":
        case "E":
          runById("egg");
          break;
      }
    });

    /* Input filter */
    document.addEventListener("input", (e) => {
      if (e.target.id === "cmd-input") {
        renderItems(e.target.value);
        resetResult();
      }
    });

    /* Click outside to close */
    document
      .getElementById("cmd-overlay")
      .addEventListener("mousedown", (e) => {
        if (e.target === document.getElementById("cmd-overlay")) close();
      });

    /* Close dot */
    document.getElementById("cmd-dot-close").addEventListener("click", close);

    /* Item clicks */
    document.getElementById("cmd-list").addEventListener("click", (e) => {
      const li = e.target.closest(".cmd-item");
      if (!li) return;
      const idx = getItems().indexOf(li);
      setActive(idx);
      execute();
    });

    /* Item hover */
    document.getElementById("cmd-list").addEventListener("mousemove", (e) => {
      const li = e.target.closest(".cmd-item");
      if (!li) return;
      const idx = getItems().indexOf(li);
      if (idx !== -1) setActive(idx);
    });
  }

  function runById(id) {
    const item = ITEMS.find((i) => i.id === id);
    if (item) item.action();
  }

  /* ── Init ── */
  function init() {
    buildDOM();
    initEvents();

    /* Tiny hint badge that fades in */
    setTimeout(() => {
      const hint = document.createElement("div");
      hint.style.cssText = `
        position: fixed; bottom: 1.4rem; right: 1.4rem; z-index: 8000;
        font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: .1em;
        color: #4a3820; background: #0e0c09; border: 1px solid #2a2218;
        padding: .35rem .75rem; border-radius: 3px;
        opacity: 0; transition: opacity .6s;
        cursor: pointer; user-select: none;
      `;
      hint.textContent = "` to open terminal";
      document.body.appendChild(hint);
      setTimeout(() => (hint.style.opacity = "1"), 50);
      setTimeout(() => (hint.style.opacity = "0"), 4000);
      setTimeout(() => hint.remove(), 5000);
      hint.addEventListener("click", open);
    }, 2200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
