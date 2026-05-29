import images from "../data/images.js";

import { getRandomItem, getRandomNumber } from "./random";

export function generateSlides() {
  const slideCount = getRandomNumber(5, 10);

  const slides = [];

  for (let i = 0; i < slideCount; i++) {
    slides.push({
      id: i + 1,
      image: getRandomItem(images),
    });
  }

  slides.push({
    id: slideCount + 1,
    word: "Спасибо за внимание",
    image:
      "https://picsum.photos/900/600?grayscale",
    isFinal: true,
  });

  return slides;
}