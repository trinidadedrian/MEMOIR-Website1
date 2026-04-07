const sections = document.querySelectorAll("section");
const scrollSpyItems = document.querySelectorAll(".scroll-spy__item");
let current = 0;
let locked = false;

function setActiveScrollSpy(index) {
  scrollSpyItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function goToSection(index) {
  if (index < 0 || index >= sections.length) return;
  locked = true;

  sections[index].scrollIntoView({ behavior: "smooth" });
  current = index;
  setActiveScrollSpy(index);

  setTimeout(() => locked = false, 900);
}

scrollSpyItems.forEach(item => {
  item.addEventListener("click", () => {
    const targetId = item.dataset.target;
    const index = [...sections].findIndex(s => s.id === targetId);
    if (!locked && index !== -1) {
      goToSection(index);
    }
  });
});

window.addEventListener("wheel", e => {
  if (locked) return;
  e.deltaY > 0 ? goToSection(current + 1) : goToSection(current - 1);
});


setActiveScrollSpy(current);
