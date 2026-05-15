export default function Slide({ slide }) {
  return (
    <section>
      <h2>Slide {slide.id}</h2>

      <img
        src={slide.image}
        alt={slide.word}
        width="600"
      />

      <h3>{slide.word}</h3>
    </section>
  );
}