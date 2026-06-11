import { useState } from "react";

import StartScreen from "./components/StartScreen/StartScreen";
import TitleScreen from "./components/TitleScreen/TitleScreen";
import Presentation from "./components/Presentation/Presentation";

import { getRandomPresentation, getRandomTitle } from "./services/api";

export default function App() {
  const [presentation, setPresentation] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [screen, setScreen] = useState("start");
  const [language, setLanguage] = useState("eng");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage);
    setError("");
  }

  async function handleGeneratePresentation() {
    try {
      setLoading(true);
      setError("");

      const data = await getRandomPresentation(language);

      setPresentation(data);
      setCurrentSlideIndex(0);
      setScreen("title");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateTitle() {
    try {
      setLoading(true);
      setError("");

      const data = await getRandomTitle(language);

      setPresentation((previousPresentation) => ({
        ...previousPresentation,
        title: data.title,
      }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleStartPresentation() {
    setCurrentSlideIndex(0);
    setScreen("presentation");
  }

  function handleBackToStart() {
    setPresentation(null);
    setCurrentSlideIndex(0);
    setScreen("start");
  }

  function handleBackToTitle() {
    setCurrentSlideIndex(0);
    setScreen("title");
  }

  function handleNextSlide() {
    if (!presentation) return;

    if (currentSlideIndex < presentation.slides.length - 1) {
      setCurrentSlideIndex((previousIndex) => previousIndex + 1);
    }
  }

  function handlePreviousSlide() {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((previousIndex) => previousIndex - 1);
    }
  }

  if (screen === "start") {
    return (
      <StartScreen
        language={language}
        onLanguageChange={handleLanguageChange}
        onGeneratePresentation={handleGeneratePresentation}
        loading={loading}
        error={error}
      />
    );
  }

  if (screen === "title" && presentation) {
    return (
      <TitleScreen
        language={language}
        title={presentation.title}
        onGenerateTitle={handleGenerateTitle}
        onStartPresentation={handleStartPresentation}
        onBack={handleBackToStart}
        loading={loading}
        error={error}
      />
    );
  }

  if (screen === "presentation" && presentation) {
    return (
      <Presentation
        language={language}
        title={presentation.title}
        slides={presentation.slides}
        currentSlideIndex={currentSlideIndex}
        onPreviousSlide={handlePreviousSlide}
        onNextSlide={handleNextSlide}
        onBackToTitle={handleBackToTitle}
        onNewGame={handleBackToStart}
      />
    );
  }

  return null;
}