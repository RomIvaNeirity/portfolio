

let currentLang = localStorage.getItem("lang") || "en";  // Зчитуємо мову або ставимо українську за замовчуванням
let translations = {};  // Сюди завантажимо обраний JSON

// Функція завантаження JSON перекладів
async function loadTranslations(lang) {
  try {
    const res = await fetch(`./lang/${lang}.json`);
    translations = await res.json();
    currentLang = lang;

    // Зберігаємо мову в localStorage, щоб не збивалася після перезавантаження
    localStorage.setItem("lang", lang);

    // Міняємо атрибут lang у <html>, це корисно для SEO та accessibility
    document.documentElement.setAttribute("lang", lang);

    // Оновлюємо тексти на сторінці
    updateTexts();
  } catch (err) {
    console.error("Помилка завантаження перекладу:", err);
  }
}

// Функція заміни текстів на сторінці
function updateTexts() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

// Обробники натискань кнопок перемикання
document.getElementById("lang-uk").addEventListener("click", () => loadTranslations("uk"));
document.getElementById("lang-en").addEventListener("click", () => loadTranslations("en"));

// При першому завантаженні сторінки
loadTranslations(currentLang);


// -----------------------
// ТЕМИ
// -----------------------

const themeToggleBtn = document.getElementById("theme-toggle");

// Визначаємо початкову тему
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Якщо не збережено — дивимось на системну тему
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "light" : "dark");
  }
}

// Функція застосування теми
function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
  localStorage.setItem("theme", theme);
  updateThemeButton(theme);
}

// Оновлюємо іконку кнопки
function updateThemeButton(theme) {
  themeToggleBtn.textContent = theme === "dark" ? "🌞" : "🌙";
}

// Обробник натискання на кнопку
themeToggleBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
  setTheme(newTheme);
});

// Ініціалізація теми при завантаженні
initTheme();

 AOS.init({offset: 280, // offset (in px) from the original trigger point
     delay: 0,
     duration: 1000,
     easing: 'ease-in-out'
 })
 

const listItems = document.querySelectorAll('.projects-list .projects-list-item');
  const rectangleTexts = document.querySelectorAll('.decor-rectangle-1 p');

 
  listItems.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    rectangleTexts.forEach(p => p.classList.remove('active', 'aos-animate'));
    if (rectangleTexts[index]) {
      const textEl = rectangleTexts[index];
      textEl.classList.add('active');
      // перезапускаємо анімацію AOS вручну
      setTimeout(() => {
        textEl.classList.add('aos-animate');
      }, 10);
    }
  });
});
document.addEventListener('click', (e) => {
  const listContainer = document.querySelector('.projects-list');
  const rectContainer = document.querySelector('.decor-rectangle-1');

  const clickedInsideList = listContainer.contains(e.target);
  const clickedInsideRectangle = rectContainer.contains(e.target);

  // Якщо клік не по списку і не по прямокутнику → ховаємо тексти
  if (!clickedInsideList && !clickedInsideRectangle) {
    rectangleTexts.forEach(p => {
      p.classList.remove('active', 'aos-animate');
    });
  }
});
