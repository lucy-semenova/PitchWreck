import adjectives from "../data/adjectives";
import nouns from "../data/nouns";
import verbs from "../data/verbs";
import periodPhrase from "../data/periodPhrase";

import { getRandomItem } from "./random";

export function generateTitle() {
  const title = `${getRandomItem(adjectives)} ${getRandomItem(
    nouns
  )} ${getRandomItem(verbs)} ${getRandomItem(periodPhrase)}`;

  return title.charAt(0).toUpperCase() + title.slice(1);
}