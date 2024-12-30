const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};

const getGuestSession = () => {
  const session = localStorage.getItem("guestSession");
  return session ? JSON.parse(session) : null;
};

export const fetchMovies = async (query, page = 1) => {
  const url = `${API_URL}/search/movie?query=${query}&page=${page}&api_key=${API_KEY}`;
  return await fetchData(url);
};

export const fetchGenres = async () => {
  const url = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.genres || [];
};

export const rateMovie = async (movieId, value) => {
  const session = getGuestSession();
  if (!session?.sessionId) {
    throw new Error("Guest session not found. Please try again.");
  }

  const url = `${API_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${session.sessionId}`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  };

  return await fetchData(url, options);
};

export const fetchRatedMovies = async () => {
  const session = getGuestSession();
  if (!session?.sessionId) {
    throw new Error("Guest session not found. Please try again.");
  }

  const url = `${API_URL}/guest_session/${session.sessionId}/rated/movies?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.results || [];
};

export const getOrCreateGuestSession = async () => {
  const session = getGuestSession();

  if (session) {
    const now = new Date();
    const expirationDate = new Date(session.expiresAt);

    if (now < expirationDate) {
      return session;
    }
  }

  const url = `${API_URL}/authentication/guest_session/new?api_key=${API_KEY}`;
  const data = await fetchData(url);

  if (!data.guest_session_id || !data.expires_at) {
    throw new Error("Invalid response from server");
  }

  const newSession = {
    sessionId: data.guest_session_id,
    expiresAt: data.expires_at,
  };

  localStorage.setItem("guestSession", JSON.stringify(newSession));
  return newSession;
};

export { API_URL, API_KEY };
