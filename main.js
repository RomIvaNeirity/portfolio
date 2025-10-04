

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

 AOS.init()
