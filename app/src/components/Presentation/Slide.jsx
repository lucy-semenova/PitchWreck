export default function Slide({ slide }) {
  if (slide.isFinal) {
    return (
      <section className="slide final-slide">
        <h1>Спасибо за внимание 🎉</h1>
        <p>Вопросы?</p>
      </section>
    );
  }

  return (
    <section className="slide">
      <h2>Slide {slide.id}</h2>

      <img src={slide.image} alt={slide.word} />

      <h3>{slide.word}</h3>
    </section>
  );
}