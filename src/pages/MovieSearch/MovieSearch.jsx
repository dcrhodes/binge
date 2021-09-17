import React, { Component } from 'react'
import * as mediaAPI from '../../services/mediaService'
import MovieCard from '../../components/MovieCard/MovieCard'

class MovieSearch extends Component {
  state = {
    searchResults: []
  }

  async componentDidMount() {
    const { params } = this.props.match
    if (params.searchType === 'byName') {
      const searchResults = await mediaAPI.search('movie', params.query)
      this.setState({ searchResults: searchResults.results })
    } else if (params.searchType === 'genre') {
      const searchResults = await mediaAPI.searchGenre('movie', params.query)
      this.setState({ searchResults: searchResults.results })
    } else if (params.searchType === 'similar') {
      const searchResults = await mediaAPI.searchSimilar('movie', params.query)
      this.setState({ searchResults: searchResults.results })
    }
  }

  async componentDidUpdate(prevProps) {
    const { params } = this.props.match
    if (params.query !== prevProps.match.params.query){
      if (params.searchType === 'byName') {
        const searchResults = await mediaAPI.search('movie', params.query)
        this.setState({ searchResults: searchResults.results })
      } else if (params.searchType === 'genre') {
        const searchResults = await mediaAPI.searchGenre('movie', params.query)
        this.setState({ searchResults: searchResults.results })
      } else if (params.searchType === 'similar') {
        const searchResults = await mediaAPI.searchSimilar('movie', params.query)
        this.setState({ searchResults: searchResults.results })
      }
    }
  }

  render() { 
    return (
      <>
        <h1>Movie Results</h1>
        {this.state.searchResults.map(movie =>
          <MovieCard
            movie={movie}
            key={movie.id}
            userProfile={this.props.userProfile}
            handleAddMedia={this.props.handleAddMedia}
            handleRemoveMedia={this.props.handleRemoveMedia}
          />
        )}
      </>  
    );
  }
}
 
export default MovieSearch;