import "./MovieCard.css";
import { format } from "date-fns";
import sliceText from "../../services/main";
import { RatingService } from "../../services/RatingService";
import { Progress, Rate, Tag } from "antd";

const getRatingColor = (rating) => {
  if (rating >= 7) return "#66E900";
  if (rating >= 5) return "#E9D100";
  if (rating >= 3) return "#E97E00";
  return "#E90000";
};

const MovieCard = ({
  id: movieId,
  title,
  date,
  description,
  posterPath,
  rating,
  userRate,
  genres = [],
  onUpdateRatedMovies,
}) => {
  const formattedDate = date
    ? format(new Date(date), "MMMM d, yyyy")
    : "Unknown";

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/original${posterPath}`
    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const shortDescription = sliceText(description, 200);

  const handleRateChange = async (value) => {
    const movieData = {
      id: movieId,
      title,
      date,
      description,
      posterPath,
      rating,
      genres,
    };

    try {
      await RatingService.rateMovie(movieId, value, movieData);
      if (onUpdateRatedMovies) {
        onUpdateRatedMovies();
      }
    } catch (error) {
      console.error("Failed to rate movie:", error.message);
    }
  };

  return (
    <div className="movie-card">
      <img
        key={posterUrl}
        src={posterUrl}
        alt={title}
        className="movie-card__image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }}
      />
      <div className="movie-card__content">
        <div className="movie-card__header">
          <h3 className="movie-card__title">{title}</h3>
          <div className="movie-card__rating">
            <Progress
              type="circle"
              percent={rating ? rating * 10 : 0}
              format={() => (rating ? rating.toFixed(1) : "N/A")}
              size={40}
              strokeColor={getRatingColor(rating || 0)}
            />
          </div>
        </div>
        <p className="movie-card__date">{formattedDate}</p>
        <div className="movie-card__genres">
          {genres.length > 0 &&
            genres.map((genre) => (
              <Tag key={genre.id} color="default">
                {genre.name}
              </Tag>
            ))}
        </div>
        <p className="movie-card__description">
          {shortDescription || "No description available"}
        </p>
        <div className="movie-card__rate">
          <Rate
            count={10}
            allowHalf
            defaultValue={userRate}
            onChange={handleRateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
