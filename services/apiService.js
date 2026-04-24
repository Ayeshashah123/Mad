export const fetchMovies = async (setMovies, setLoading) => {
  try {
    const res = await fetch("https://reactnative.dev/movies.json");
    const data = await res.json();
    setMovies(data.movies);
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};