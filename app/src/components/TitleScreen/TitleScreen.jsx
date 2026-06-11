import styles from "./TitleScreen.module.css";

const screenText = {
  eng: {
   
        generating: "Generating...",
    generateNewTitle: "Generate New Title",
    startPresentation: "Start Presentation",
    back: "Back",
  },
  rus: {
 
        generating: "Генерируется...",
    generateNewTitle: "Сгенерировать новую тему",
    startPresentation: "Начать презентацию",
    back: "Назад",
  },
};

export default function TitleScreen({
  language,
  title,
  onGenerateTitle,
  onStartPresentation,
  onBack,
  loading,
  error,
}) {
  const text = screenText[language];

  return (
    <main className={styles.titleScreen}>

      <h1>{title}</h1>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.titleActions}>
         <div className={styles.firstButtonRow}>
        <button type="button" className={styles.button} onClick={onGenerateTitle} disabled={loading}>
          {loading ? text.generating : text.generateNewTitle}
        </button>
        </div>
         <div className={styles.secondButtonRow}>
        <button type="button" className={styles.button} onClick={onStartPresentation}>
          {text.startPresentation}
        </button>

        <button type="button" className={styles.button} onClick={onBack}>
          {text.back}
        </button>
        </div>
        </div>
    </main>
  );
}