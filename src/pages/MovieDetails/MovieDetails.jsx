import React, { Component } from 'react'
import * as mediaAPI from '../../services/mediaService'


class MovieDetails extends Component {
  state = {
    searchResult: {}
  }

  async componentDidMount() {
    const searchResult = await mediaAPI.searchOne('movie', this.props.match.params.id)
    this.setState({searchResult})
  }

  render() {
    const { searchResult } = this.state 
    return (
      <>
        <h1>{searchResult.title}</h1>
        <h3>{searchResult?.tagline}</h3>
        <img src={`https://image.tmdb.org/t/p/w400/${searchResult.backdrop_path}`} alt="backdrop" /><br></br>
        <p>{searchResult.overview}</p>
        <a href={`https://www.imdb.com/title/${searchResult.imdb_id}`}>View on IMDB</a><br></br><br></br>
        <a href={`/search/movies/similar/${searchResult.id}`}>Find similar movies</a>
        <h4>Runtime: {searchResult?.runtime} minutes</h4>
        <h4>Budget: ${searchResult?.budget}</h4>
        <h4>Revenue: ${searchResult?.revenue}</h4>
        <h3>Genres:</h3>
        {searchResult.genres?.map(genre => 
          <a key={genre.id} href={`/search/movies/genre/${genre.id}`}>
            <p>{genre.name}</p>
          </a>
        )}
        {searchResult.videos?.results.map((video, idx) => 
           <iframe key={idx} title={`search-video-${idx}`} src={`http://www.youtube.com/embed/${video.key}`}
           width="560" height="315" frameBorder="0"></iframe>  
        )}
      </>
    );
  }
}
 
export default MovieDetails;