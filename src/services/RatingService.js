import { API_URL, API_KEY } from "../api";

const getGuestSession = async () => {
  let session = localStorage.getItem("guestSession");

  if (!session) {
    await createGuestSession();
    session = localStorage.getItem("guestSession");
  }

  return session ? JSON.parse(session) : null;
};

const createGuestSession = async () => {
  try {
    const response = await fetch(
      `${API_URL}/authentication/guest_session/new?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to create guest session. Status: ${response.status}`
      );
    }

    const data = await response.json();

    localStorage.setItem(
      "guestSession",
      JSON.stringify({
        sessionId: data.guest_session_id,
        expiresAt: data.expires_at,
      })
    );
  } catch (error) {
    console.error("Error creating guest session:", error);
    throw error;
  }
};

const rateMovie = async (movieId, value, movieData) => {
  const session = await getGuestSession();
  if (!session?.sessionId) {
    throw new Error("Guest session not found. Please try again.");
  }

  const ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || {};
  ratedMovies[movieId] = { ...movieData, userRate: value };
  localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));

  try {
    const response = await fetch(
      `${API_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${session.sessionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to rate movie. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error rating movie:", error);
    throw error;
  }
};

const getRatedMovies = () => {
  return Object.values(JSON.parse(localStorage.getItem("ratedMovies")) || {});
};

export const RatingService = {
  rateMovie,
  getRatedMovies,
};
