import prompts from "../data/prompts";
import images from "../data/images.js";

import { getRandomItem } from "./random";


export function generateSlides() {
  const randomCount = Math.floor(Math.random() * 6) + 5;
 const slides = [];

  for (let i = 0; i < randomCount; i++) {
    slides.push({
      id: i + 1,
      word: getRandomItem(prompts),
      image: getRandomItem(images),
    });
  }

  return slides;
}