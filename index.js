// ── Cursor ──
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
function animateCursor() {
  cur.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.addEventListener("mousedown", () => {
  cur.style.transform += " scale(1.8)";
  ring.style.opacity = ".3";
});
document.addEventListener("mouseup", () => {
  ring.style.opacity = ".6";
});

// ── Reveal on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right")
  .forEach((el) => observer.observe(el));