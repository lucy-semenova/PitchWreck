import styles from "./StartScreen.module.css";

const screenText = {
  eng: {
    welcome: "Welcome to PitchWreck!",
    rules: [
      "Get a ridiculous topic. Pretend you totally prepared it.",
      
    ],
     generating: "Generating...",
    generateTopic: "Generate Topic",
  },
  rus: {
    welcome: "Добро пожаловать в PitchWreck!",
    rules: [
      "Получите безумную тему. Делайте вид, что готовились всю жизнь."
          ],
      generating: "Генерируется...",
    generateTopic: "Сгенерировать тему",
  },
};

export default function StartScreen({
  language,
  onLanguageChange,
  onGeneratePresentation,
  loading,
  error,
}) {
  const text = screenText[language];

  return (
    <main className={styles.startScreen}>
      <h1>{text.welcome}</h1>

      <div className={styles.languageButtons}>
        <button
          type="button"
          className={language === "eng" ? styles.active : ""}
          onClick={() => onLanguageChange("eng")}
        >
          English
        </button>

        <button
          type="button"
          className={language === "rus" ? styles.active : ""}
          onClick={() => onLanguageChange("rus")}
        >
          Русский
        </button>
      </div>

      <div className={styles.rules}>
        {text.rules.map((rule) => (
          <p key={rule}>{rule}</p>
        ))}
      </div>

     
      {error && <p className={styles.errorMessage}>{error}</p>}

      <button
        type="button"
        className={styles.mainButton}
        onClick={onGeneratePresentation}
        disabled={loading}
      >
        {loading ? text.generating : text.generateTopic}
      </button>
    </main>
  );
}