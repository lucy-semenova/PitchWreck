import Slide from "./Slide";
import styles from "./Presentation.module.css";

const screenText = {
  eng: {
    slide: "Slide",
    of: "of",
    previous: "Previous",
    next: "Next",
   
    newGame: "New Game",
  },
  rus: {
    slide: "Слайд",
    of: "из",
    previous: "Назад",
    next: "Дальше",
       newGame: "Новая игра",
  },
};

export default function Presentation({
  language,
  title,
  slides,
  currentSlideIndex,
  onPreviousSlide,
  onNextSlide,
  onBackToTitle,
  onNewGame,
}) {
  const text = screenText[language];
  const currentSlide = slides[currentSlideIndex];

  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === slides.length - 1;

  return (
    <main className={styles.presentationScreen}>
      <header className={styles.presentationHeader}>
        <h1>{title}</h1>

        <p>
          {text.slide} {currentSlideIndex + 1} {text.of} {slides.length}
        </p>
      </header>

      

      <div className={styles.presentationActions}>
        <button
          type="button"
          className={styles.button}
          onClick={onPreviousSlide}
          disabled={isFirstSlide}
        >
          {text.previous}
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={onNextSlide}
          disabled={isLastSlide}
        >
          {text.next}
        </button>

      
        <button type="button" className={styles.button} onClick={onNewGame}>
          {text.newGame}
        </button>
      </div>
      <Slide slide={currentSlide.id} slide={currentSlide} language={language} />
    </main>
  );
}