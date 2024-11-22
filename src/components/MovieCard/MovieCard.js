import "./MovieCard.css";
import { format } from "date-fns";
import sliceText from "../../services/main";

const MovieCard = ({ title, date, description, posterPath }) => {
  const formattedDate = date
    ? format(new Date(date), "MMMM d, yyyy")
    : "Unknown";

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/original${posterPath}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const shortDescription = sliceText(description, 200);

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} className="movie-card__image" />
      <div className="movie-card__content">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__date">{formattedDate}</p>
        <div className="movie-card__genre">Action</div>
        <p className="movie-card__description">
          {shortDescription || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
