const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const copyButton = document.querySelector("#copy-citation");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

if (window.location.hash) {
  const target = document.querySelector(window.location.hash);

  if (target) {
    document.documentElement.style.scrollBehavior = "auto";
    target.scrollIntoView();
    target.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
    window.setTimeout(() => {
      document.documentElement.style.removeProperty("scroll-behavior");
    }, 0);
  }
}

copyButton.addEventListener("click", async () => {
  const citation = document.querySelector("#bibtex").textContent;

  try {
    await navigator.clipboard.writeText(citation);
    copyButton.textContent = "Copied";
    window.setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1600);
  } catch {
    copyButton.textContent = "Select text";
  }
});
