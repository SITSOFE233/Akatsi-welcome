

"use strict";
const GREETINGS = [
  "Welcome",     // English
  "Woezɔ",       // Ewe
  "Akwaaba",     // Twi
  "Barka da zuwa", // Hausa
  "Bienvenue"    // French
];

const ORIENTATION = [
  {
    day: "Day 1", title: "Arrival and Registration",
    sub: "Settle in and complete your admission formalities.",
    items: [
      ["8:00 am",  "Arrival and reporting", "Report to the welcome desk with your admission letter and original documents."],
      ["10:00 am", "Registration and payments", "Complete registration, pay fees and collect your student identity details."],
      ["1:00 pm",  "Hall or hostel allocation", "Find your room, meet your roommates and unpack."],
      ["5:00 pm",  "Meet your class", "Say hello to your course mates and your class coordinator."]
    ]
  },
  {
    day: "Day 2", title: "Meet Your College",
    sub: "Learn who we are and what we expect.",
    items: [
      ["8:00 am",  "Opening and official welcome", "Greetings from the College management and tutors."],
      ["10:30 am", "College history and values", "Discover the story, the traditions and the values of the college."],
      ["1:30 pm",  "Campus tour", "Visit lecture halls, the library, the dining hall, the sick bay and the sports field."],
      ["4:00 pm",  "Departments and tutors", "Meet the heads of department and your tutors."]
    ]
  },
  {
    day: "Day 3", title: "Rules and Student Life",
    sub: "Know your rights, duties and the code of conduct.",
    items: [
      ["8:00 am",  "Rules and regulations", "Understand the code of conduct, attendance rules and examination regulations."],
      ["10:30 am", "Student leadership", "Meet the Students' Representative Council and the Chaplaincy."],
      ["2:00 pm",  "Health, safety and welfare", "Learn about health services, counselling and how to ask for help."],
      ["4:30 pm",  "Clubs and societies fair", "Find a club that matches your interests and talents."]
    ]
  },
  {
    day: "Day 4", title: "Study Skills",
    sub: "Get the habits that lead to good results.",
    items: [
      ["8:00 am",  "How to succeed in college", "Time management, note-taking and reading for understanding."],
      ["10:30 am", "Library and ICT orientation", "Learn how to borrow books and use computers and the internet for study."],
      ["2:00 pm",  "Teaching practice overview", "Hear how teaching practice works and how to prepare for it."],
      ["4:00 pm",  "Study groups", "Form small groups to support one another."]
    ]
  },
  {
    day: "Day 5", title: "Celebration",
    sub: "Come together as one college family.",
    items: [
      ["9:00 am",  "Matriculation preparation", "Practise the programme and learn the oath."],
      ["12:00 pm", "Lunch with seniors", "Meet students from the upper levels and ask your questions."],
      ["4:00 pm",  "Cultural and talent show", "Show your talent through song, drama, poetry or dance."],
      ["7:00 pm",  "Closing and social evening", "End the week together as a new class."]
    ]
  }
];


const CHECKLIST = [
  "Report to the college with my admission letter and original documents",
  "Complete registration and pay my fees",
  "Collect my room or hostel allocation and settle in",
  "Introduce myself to my roommates and course mates",
  "Locate my lecture halls, the library and the dining hall",
  "Write my timetable and keep it where I can see it",
  "Save the contact details of my class coordinator",
  "Read the student handbook and code of conduct"
];


const TIPS = [
  "Plan your week. A simple timetable keeps lectures, study and rest in balance.",
  "Ask questions early. Your tutors would rather you ask today than struggle alone for weeks.",
  "Read before you attend lectures. Even ten minutes of reading helps you follow better.",
  "Make friends across programmes. The best study groups share different strengths.",
  "Look after your health. Sleep, eat well and take your breaks. A tired mind learns slowly.",
  "Be punctual and respectful. Teachers are role models, and your habits begin now.",
  "Join one club or society. It teaches leadership and gives you friends outside class.",
  "Save a little every week. Small, steady habits with money protect you from stress."
];

const QUOTES = [
  "A good teacher is a lamp that lights many others.",
  "Today you are a student. Tomorrow you will shape a nation.",
  "Teach with your heart and the lessons will last for life.",
  "Every great teacher was once a nervous fresher."
];


const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function safeStorage() {
  try { return window.localStorage; } catch (e) { return null; }
}
const store = safeStorage();
const year = new Date().getFullYear();
$("#yearA").textContent = year;
$("#yearB").textContent = year;


(function typewriter() {
  const el = $("#typed");
  if (reduceMotion) { el.textContent = GREETINGS[0]; return; }
  let word = 0, char = 0, deleting = false;

  function tick() {
    const full = GREETINGS[word];
    char += deleting ? -1 : 1;
    el.textContent = full.slice(0, char);

    let delay = deleting ? 55 : 110;
    if (!deleting && char === full.length) { deleting = true; delay = 1600; }
    else if (deleting && char === 0) { deleting = false; word = (word + 1) % GREETINGS.length; delay = 350; }
    setTimeout(tick, delay);
  }
  tick();
})();


const nav = $("#nav");
const toTop = $("#toTop");
function onScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 40);
  toTop.hidden = window.scrollY < 700;
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const menuBtn = $("#menuBtn"), menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });


function animateCount(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  if (reduceMotion) { el.textContent = target + suffix; return; }
  const start = performance.now(), dur = 1400;
  (function step(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(step);
  })(start);
}

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in");
    $$("[data-count]", entry.target).forEach(animateCount);
    io.unobserve(entry.target);
  });
}, { threshold: 0.15 });
$$(".reveal").forEach(el => io.observe(el));

const confetti = (function () {
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  const colours = ["#f2b705", "#ffe08a", "#1f8a63", "#c8432b", "#ffffff"];
  let pieces = [], running = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.vy += 0.12; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    pieces = pieces.filter(p => p.y < canvas.height + 30);
    if (pieces.length) requestAnimationFrame(frame);
    else { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }

  return function burst(count = 160) {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      pieces.push({
        x: canvas.width / 2 + (Math.random() - .5) * 200,
        y: canvas.height * 0.45,
        vx: (Math.random() - .5) * 16,
        vy: -Math.random() * 14 - 4,
        w: 6 + Math.random() * 7, h: 8 + Math.random() * 9,
        rot: Math.random() * 6, vr: (Math.random() - .5) * .35,
        c: colours[Math.floor(Math.random() * colours.length)]
      });
    }
    if (!running) { running = true; requestAnimationFrame(frame); }
  };
})();

const form = $("#greetForm");
const card = $("#card");
const dlBtn = $("#downloadBtn");
$("#cardDate").textContent = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

function timeOfDay() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

function toTitleCase(s) {
  return s.trim().replace(/\s+/g, " ")
    .toLowerCase().replace(/(^|[\s\-'])([a-zà-ÿ])/g, (m, a, b) => a + b.toUpperCase());
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = toTitleCase($("#name").value);
  const prog = $("#programme").value;
  if (!name || !prog) return;

  $("#cardGreet").textContent = timeOfDay() + " and welcome";
  $("#cardName").textContent = name;
  $("#cardProg").textContent = prog + " · Akatsi College of Education";
  $("#cardMsg").textContent = "“" + QUOTES[Math.floor(Math.random() * QUOTES.length)] + "”";

  card.classList.remove("pop"); void card.offsetWidth; card.classList.add("pop");
  dlBtn.hidden = false;
  confetti();
  if (window.innerWidth < 860) card.scrollIntoView({ behavior: "smooth", block: "center" });
});


dlBtn.addEventListener("click", () => {
  const W = 1080, H = 1350;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d");

  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#072b21"); bg.addColorStop(.6, "#135640"); bg.addColorStop(1, "#1b7a58");
  g.fillStyle = bg; g.fillRect(0, 0, W, H);

  const glow = g.createRadialGradient(W - 100, 120, 0, W - 100, 120, 460);
  glow.addColorStop(0, "rgba(242,183,5,.55)"); glow.addColorStop(1, "rgba(242,183,5,0)");
  g.fillStyle = glow; g.fillRect(0, 0, W, H);

  const stripe = ["#f2b705", "#c8432b", "#1f8a63"];
  for (let x = 0, i = 0; x < W; x += 60, i++) { g.fillStyle = stripe[i % 3]; g.fillRect(x, H - 26, 60, 26); }

  g.fillStyle = "#f2b705";
  roundRect(g, 90, 90, 90, 90, 24); g.fill();
  g.fillStyle = "#072b21"; g.font = "800 62px Georgia, serif"; g.textAlign = "center"; g.textBaseline = "middle";
  g.fillText("A", 135, 138);

  g.textAlign = "left"; g.textBaseline = "alphabetic";
  g.fillStyle = "#ffffff"; g.font = "600 38px system-ui, sans-serif";
  g.fillText("Akatsi College of Education", 205, 150);

  g.fillStyle = "#f2b705"; g.font = "500 34px system-ui, sans-serif";
  g.fillText($("#cardGreet").textContent.toUpperCase(), 90, 520);

  g.fillStyle = "#ffffff"; g.font = "800 110px Georgia, serif";
  wrapText(g, $("#cardName").textContent, 90, 650, W - 180, 128);

  g.fillStyle = "rgba(255,255,255,.85)"; g.font = "400 38px system-ui, sans-serif";
  wrapText(g, $("#cardProg").textContent, 90, 980, W - 180, 52);

  g.fillStyle = "#ffe08a"; g.font = "italic 44px Georgia, serif";
  wrapText(g, $("#cardMsg").textContent, 90, 1130, W - 180, 60);

  g.fillStyle = "rgba(255,255,255,.7)"; g.font = "400 30px system-ui, sans-serif";
  g.fillText("#FreshersWelcome", 90, H - 70);

  const a = document.createElement("a");
  a.download = "akatsi-welcome-card.png";
  a.href = c.toDataURL("image/png");
  a.click();
});
   

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}

function wrapText(g, text, x, y, maxW, lineH) {
  const words = text.split(" ");
  let line = "";
  words.forEach(w => {
    const test = line ? line + " " + w : w;
    if (g.measureText(test).width > maxW && line) { g.fillText(line, x, y); line = w; y += lineH; }
    else line = test;
  });
  g.fillText(line, x, y);
}

(function orientation() {
  const tabs = $("#tabs"), panel = $("#panel");

  ORIENTATION.forEach((d, i) => {
    const b = document.createElement("button");
    b.className = "tab"; b.type = "button"; b.role = "tab";
    b.id = "tab-" + i; b.textContent = d.day;
    b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.setAttribute("aria-controls", "panel");
    b.addEventListener("click", () => show(i));
    tabs.appendChild(b);
  });

  function show(i) {
    $$(".tab", tabs).forEach((t, n) => t.setAttribute("aria-selected", String(n === i)));
    panel.setAttribute("aria-labelledby", "tab-" + i);
    const d = ORIENTATION[i];
    panel.innerHTML = "";

    const h = document.createElement("h3"); h.textContent = d.day + ": " + d.title;
    const s = document.createElement("p"); s.className = "sub"; s.textContent = d.sub;
    const ul = document.createElement("ul"); ul.className = "timeline";

    d.items.forEach(([time, title, text], n) => {
      const li = document.createElement("li");
      li.style.animationDelay = (n * 90) + "ms";
      const t = document.createElement("time"); t.textContent = time;
      const st = document.createElement("strong"); st.textContent = title;
      const p = document.createElement("p"); p.textContent = text;
      li.append(t, st, p); ul.appendChild(li);
    });
    panel.append(h, s, ul);
  }
  show(0);

  tabs.addEventListener("keydown", e => {
    const all = $$(".tab", tabs);
    const cur = all.findIndex(t => t.getAttribute("aria-selected") === "true");
    let next = cur;
    if (e.key === "ArrowRight") next = (cur + 1) % all.length;
    else if (e.key === "ArrowLeft") next = (cur - 1 + all.length) % all.length;
    else return;
    show(next); all[next].focus();
  });
})();


(function checklist() {
  const list = $("#checks"), fill = $("#fill"), pct = $("#pct"), done = $("#doneMsg");
  const KEY = "akatsi-fresher-checklist";
  let saved = [];
  try { saved = JSON.parse((store && store.getItem(KEY)) || "[]"); } catch (e) { saved = []; }

  CHECKLIST.forEach((text, i) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox"; input.checked = saved.includes(i);
    const box = document.createElement("span"); box.className = "box";
    const t = document.createElement("span"); t.className = "txt"; t.textContent = text;
    label.append(input, box, t); li.appendChild(label); list.appendChild(li);
    input.addEventListener("change", () => { update(true); });
  });

  function update(fromUser) {
    const boxes = $$("input", list);
    const ticked = boxes.map((b, i) => b.checked ? i : -1).filter(i => i >= 0);
    const p = Math.round((ticked.length / boxes.length) * 100);
    fill.style.width = p + "%"; pct.textContent = p + "%";
    const complete = ticked.length === boxes.length;
    done.hidden = !complete;
    if (complete && fromUser) confetti(120);
    try { if (store) store.setItem(KEY, JSON.stringify(ticked)); } catch (e) { /* storage blocked */ }
  }
  update(false);
})();

(function tips() {
  const text = $("#tipText"), count = $("#tipCount"), btn = $("#tipBtn");
  let i = 0;
  function render() {
    text.textContent = TIPS[i];
    count.textContent = (i + 1) + " / " + TIPS.length;
  }
  render();
  btn.addEventListener("click", () => {
    text.classList.add("swap");
    setTimeout(() => { i = (i + 1) % TIPS.length; render(); text.classList.remove("swap"); }, 230);
  });
})();
