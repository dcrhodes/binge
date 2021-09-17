import React from 'react'
import moment from 'moment'
import * as movieGenreLookup from '../../services/genreLookup'
import MediaForm from '../MediaForm/MediaForm'

const MovieCard = ({ movie, userProfile, handleAddMedia, handleRemoveMedia }) => {
  return (
    <>
      <a href={`/movies/${movie.id}`}>
        <h1>{movie.title}</h1>
      </a>
      <img src={"https://image.tmdb.org/t/p/w200/" + movie.poster_path} alt="poster" />
      <p>{movie.overview}</p>
      <p>Release Date: {moment(movie.release_date).format('MMMM Do, YYYY')}</p>
      <a href={`/search/movies/similar/${movie.id}`}>Find similar movies</a>
      <h4>Genres:</h4>
      {movie.genre_ids.map((genre, idx) =>
        <a key={idx} href={`/search/movies/genre/${genre}`}>
          <p>{movieGenreLookup.identifyMovieGenre(genre)}</p>
        </a>
      )}
      <MediaForm
        media={movie}
        userProfile={userProfile}
        type="movie"
        handleAddMedia={handleAddMedia}
        handleRemoveMedia={handleRemoveMedia}
      />
    </>
  );
}
 
export default MovieCard;