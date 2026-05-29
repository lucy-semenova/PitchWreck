import Slide from "./components/Presentation/Slide";
import { useState, useEffect } from "react";

import { generateTitle } from "./utils/generateTitle";
import { generateSlides } from "./utils/generateSlides";

export default function App() {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [title, setTitle] = useState(generateTitle());
  const [slides, setSlides] = useState(generateSlides());
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleGenerateNew() {
    setTitle(generateTitle());
    setSlides(generateSlides());
    setCurrentSlideIndex(0);
    setIsPlaying(false);
  }

  function handleStart() {
    setIsPlaying(true);
  }

  function handleStop() {
    setIsPlaying(false);
  setIsAutoPlaying(false);
  setCurrentSlideIndex(0);
  }

  function handleNextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }
function handleAutoPlay() {
  setIsPlaying(true);
  setIsAutoPlaying(!isAutoPlaying);
}
useEffect(() => {
  if (!isAutoPlaying) return;

  const interval = setInterval(() => {
    setCurrentSlideIndex((previousIndex) => {
      if (previousIndex < slides.length - 1) {
        return previousIndex + 1;
      }

      setIsAutoPlaying(false);
      return previousIndex;
    });
  }, 5000);

  return () => clearInterval(interval);
}, [isAutoPlaying, slides.length]);



  
  return (
    <main>
      <h1>PitchWreck</h1>
     
      <h3>Импровизируй. Выживай. Не паникуй.</h3>

      <h2>{title}</h2>

      <button onClick={handleGenerateNew}>Сгенерировать новый</button>
      <button onClick={handleStart}>Старт</button>
    <button
  onClick={handleNextSlide}
  disabled={
    currentSlideIndex === slides.length - 1 ||
    isAutoPlaying
  }
>
  Следующий
</button>
      <button onClick={handleAutoPlay}>
  {isAutoPlaying ? "Stop Auto" : "Auto Play"}
</button>
      <button onClick={handleStop}>Стоп</button>
      

      {isPlaying && <Slide slide={slides[currentSlideIndex]} />}
      {isPlaying && currentSlideIndex === slides.length - 1 && (
  <p>You survived PitchWreck 🎉</p>
)}
    </main>
  );
}