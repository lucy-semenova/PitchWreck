import styles from "./Slide.module.css";

const slideText = {
    eng: {
    questions: "Thank you for the attention! Any questions?",
  },
  rus: {
    questions: "Спасибо за внимание. Вопросы?",
  },
};
export default function Slide({ slide, language }) {
  if (slide.isFinal) {
    return (
      <section className={`${styles.slide} ${styles.finalSlide}`}>
               <p>{slideText[language].questions}</p>
      </section>
    );
  }

  return (
    <section className={styles.slide}>
   

      <img
        src={slide.image}
        alt={slide.description }
        className={styles.slideImage}
      />
  
    </section>
  );
}