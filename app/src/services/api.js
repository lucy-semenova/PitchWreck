const API_URL = import.meta.env.VITE_API_URL;

async function handleResponse(response, fallbackMessage) {
  if (!response.ok) {
    let errorMessage = fallbackMessage;

    try {
      const data = await response.json();
      errorMessage = data.error || fallbackMessage;
    } catch {
      errorMessage = fallbackMessage;
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

export async function getRandomPresentation(language) {
  const response = await fetch(
    `${API_URL}/api/random/presentation?language=${language}`
  );

  return handleResponse(response, "Could not generate presentation");
}

export async function getRandomTitle(language) {
  const response = await fetch(
    `${API_URL}/api/random/title?language=${language}`
  );

  return handleResponse(response, "Could not generate title");
}