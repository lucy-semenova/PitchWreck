# PitchWreck

### Survive the presentation.

PitchWreck is a small React-based PowerPoint karaoke game that generates chaotic random presentations for improvisation practice, team games, workshops, and fun speaking challenges.

The app creates:
- A random presentation title
- Random slides
- Random images
- Random words and prompts
- A completely unpredictable presentation experience

Users must improvise their way through the presentation and survive the chaos.

---

## Features

- Random presentation title generator
- Dynamic slide generation
- Random slide count
- Random images and keywords
- Start / Stop presentation controls
- Generate new presentations instantly
- Slideshow mode
- Responsive UI

---

## Example Presentation Titles

- The Invisible Banana Negotiates
- The Dramatic Penguin Explodes
- The Confused Robot Investigates

---

## Tech Stack

- React
- Vite
- JavaScript
- CSS

---

## Project Structure

```text
src/
│
├── components/
│   ├── Slide.jsx
│   ├── GameControls.jsx
│   ├── PresentationPreview.jsx
│
├── data/
│   ├── adjectives.js
│   ├── nouns.js
│   ├── verbs.js
│   ├── words.js
│   └── images.js
│
├── utils/
│   └── random.js
│
├── App.jsx
└── main.jsx
```

---

## Game Flow

1. Click **Generate New**
2. A random presentation is created
3. Press **Start**
4. Present the slides live
5. Try to survive the presentation

---

## Future Improvements

- Timer mode
- Multiplayer mode
- AI-generated prompts
- Sound effects
- Presentation themes
- Difficulty levels
- Custom word packs
- Share presentation link

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/pitchwreck.git
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Deployment

The project can be deployed using:
- Vercel
- Netlify
- GitHub Pages

---

## Inspiration

Inspired by PowerPoint karaoke and improvisation games where presenters must explain slides they have never seen before.

---

## Author

Created as a frontend pet project for learning React, state management, random content generation, and UI interactions.
