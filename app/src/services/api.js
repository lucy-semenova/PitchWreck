const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function getRandomPresentation(language) {
  const response = await fetch(
    `${API_URL}/api/random/presentation?language=${language}`
  );

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch presentation");
  }
if (!response.ok) {
    throw new Error("Could not generate presentation");
  }

  return response.json();
}

export async function getRandomTitle(language) {
  const response = await fetch(
    `${API_URL}/api/random/title?language=${language}`
  );

  if (!response.ok) {
    throw new Error("Could not generate title");
  }

  return response.json();
}