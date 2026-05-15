import { useState} from "react";

import Slide from "./components/Presentation/Slide";

import { generateTitle } from "./utils/generateTitle";
import { generateSlides } from "./utils/generateSlides";

export default function App() {
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
    setCurrentSlideIndex(0);
  }

  function handleNextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }





  
  return (
    <main>
      <h1>PitchWreck</h1>
      <p>Survive the presentation.</p>

      <h2>{title}</h2>

      <button onClick={handleGenerateNew}>Generate New</button>
      <button onClick={handleStart}>Start</button>
     <button onClick={handleNextSlide} disabled={currentSlideIndex === slides.length - 1}>
  Next
</button>
      <button onClick={handleStop}>Stop</button>

      {isPlaying && <Slide slide={slides[currentSlideIndex]} />}
      {isPlaying && currentSlideIndex === slides.length - 1 && (
  <p>You survived PitchWreck 🎉</p>
)}
    </main>
  );
}