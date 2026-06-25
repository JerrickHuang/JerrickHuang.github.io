const languageToggle = document.querySelector(".language-toggle");
const translatableElements = document.querySelectorAll("[data-en][data-zh]");
const storedLanguage = localStorage.getItem("portfolio-language");

function setLanguage(language) {
  const isChinese = language === "zh";

  document.documentElement.lang = isChinese ? "zh-TW" : "en";

  translatableElements.forEach((element) => {
    element.textContent = isChinese ? element.dataset.zh : element.dataset.en;
  });

  languageToggle.setAttribute(
    "aria-label",
    isChinese ? "Switch to English" : "切換為中文"
  );

  localStorage.setItem("portfolio-language", language);
}

languageToggle.addEventListener("click", () => {
  const nextLanguage =
    document.documentElement.lang === "zh-TW" ? "en" : "zh";

  setLanguage(nextLanguage);
});

document.getElementById("year").textContent = new Date().getFullYear();
setLanguage(storedLanguage === "zh" ? "zh" : "en");
