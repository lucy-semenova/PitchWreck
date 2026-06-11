import express from "express";
import db from "../database/db.js";
import { getRandomRow } from "../utils/getRandomRow.js";

const router = express.Router();

const ALLOWED_LANGUAGES = ["eng", "rus"];

const TABLES = {
  adjectives: "Adjectives",
  nouns: "nouns",
  verbs: "verbs",
  terms: "terms",
  periodPhrases: "periodPhrase",
  questionWords: "questionWords",
};

const MEDIA_TABLES = {
  graphs: "graphs",
  images: "images",
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateLanguage(language) {
  const selectedLanguage = language || "eng";

  if (!ALLOWED_LANGUAGES.includes(selectedLanguage)) {
    const error = new Error("Unsupported language. Use 'eng' or 'rus'.");
    error.statusCode = 400;
    throw error;
  }

  return selectedLanguage;
}

function validateTableName(table) {
  const allowedTables = Object.values(TABLES);

  if (!allowedTables.includes(table)) {
    throw new Error("Invalid table name");
  }

  return table;
}

function validateMediaTableName(table) {
  const allowedTables = Object.values(MEDIA_TABLES);

  if (!allowedTables.includes(table)) {
    throw new Error("Invalid media table name");
  }

  return table;
}

async function getRandomByQuery(query, params = []) {
  const row = await getRandomRow(db, query, params);

  if (!row) {
    throw new Error("No matching data found in database");
  }

  return row;
}

async function getRandomWord(table, language) {
  const safeTable = validateTableName(table);

  return getRandomByQuery(
    `
    SELECT word
    FROM ${safeTable}
    WHERE language = ?
    ORDER BY RANDOM()
    LIMIT 1
    `,
    [language]
  );
}

function getRandomUniqueMediaRows(table, count, excludedUrls = []) {
  const safeTable = validateMediaTableName(table);

  const placeholders = excludedUrls.map(() => "?").join(",");

  const excludeClause =
    excludedUrls.length > 0 ? `WHERE url NOT IN (${placeholders})` : "";

  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT url, MIN(description) AS description
      FROM ${safeTable}
      ${excludeClause}
      GROUP BY url
      ORDER BY RANDOM()
      LIMIT ?
      `,
      [...excludedUrls, count],
      (error, rows) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(rows);
      }
    );
  });
}
async function createPresentationTitle(language) {
  const [adjective, noun, verb, term, period] = await Promise.all([
    getRandomWord(TABLES.adjectives, language),
    getRandomWord(TABLES.nouns, language),
    getRandomWord(TABLES.verbs, language),
    getRandomWord(TABLES.terms, language),
    getRandomWord(TABLES.periodPhrases, language),
  ]);

  if (language === "rus") {
    return `${adjective.word} ${noun.word} ${verb.word} ${term.word} ${period.word}`;
  }

  const questionWord = await getRandomWord(TABLES.questionWords, language);

  return `${questionWord.word} ${term.word} ${verb.word} ${adjective.word} ${noun.word} ${period.word}`;
}

function createRandomSlide(id, media, mediaType) {
  return {
    id,
    image: media.url,
    description: media.description,
    mediaType,
  };
}

function createFinalSlide(id, language) {
  return {
    id,
    word:
      language === "rus"
        ? "Спасибо за внимание"
        : "Thank you for your attention",
    image: null,
    isFinal: true,
  };
}

router.get("/presentation", async (req, res) => {
  try {
    const language = validateLanguage(req.query.language);
    const title = await createPresentationTitle(language);

    const contentSlideCount = getRandomNumber(6, 14);

    const graphCount = Math.ceil(contentSlideCount / 2);
    const imageCount = Math.floor(contentSlideCount / 2);

    const selectedGraphs = await getRandomUniqueMediaRows(
      MEDIA_TABLES.graphs,
      graphCount
    );

    if (selectedGraphs.length < graphCount) {
      throw new Error("Not enough unique graphs in database");
    }

    const graphUrls = selectedGraphs.map((graph) => graph.url);

    const selectedImages = await getRandomUniqueMediaRows(
      MEDIA_TABLES.images,
      imageCount,
      graphUrls
    );

    if (selectedImages.length < imageCount) {
      throw new Error("Not enough unique images in database");
    }

    const slides = [];

    let graphIndex = 0;
    let imageIndex = 0;

    for (let i = 1; i <= contentSlideCount; i++) {
      const isOddSlide = i % 2 !== 0;

      if (isOddSlide) {
        const graph = selectedGraphs[graphIndex];
        const slide = createRandomSlide(i, graph, "graph");

        slides.push(slide);
        graphIndex++;
      } else {
        const image = selectedImages[imageIndex];
        const slide = createRandomSlide(i, image, "image");

        slides.push(slide);
        imageIndex++;
      }
    }

    slides.push(createFinalSlide(contentSlideCount + 1, language));

    res.json({
      title,
      language,
      slideCount: slides.length,
      slides,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
});

router.get("/title", async (req, res) => {
  try {
    const language = validateLanguage(req.query.language);
    const title = await createPresentationTitle(language);

    res.json({
      title,
      language,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
});

export default router;