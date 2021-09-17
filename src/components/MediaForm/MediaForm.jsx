import React, { Component } from 'react'

class MediaForm extends Component {
  state = {
    formData: {
      api_id: this.props.media.id,
      title: this.props.type === 'tv' ? this.props.media.name : this.props.media.title,
      backdrop_path: this.props.media.backdrop_path,
      poster_path: this.props.media.poster_path,
      release_date: this.props.type === 'tv' ? this.props.media.first_air_date : this.props.media.release_date,
      type: this.props.type,
    }
  }


  handleAddMedia = e => {
    e.preventDefault()
    this.props.handleAddMedia(this.state.formData)
  }

  handleRemoveMedia = e => {
    e.preventDefault()
    this.props.handleRemoveMedia(this.state.formData.api_id)
  }

  render() { 
    return (
      <>
        { this.props.userProfile?.media.some(media => media.api_id === this.state.formData.api_id) &&
          <button onClick={this.handleRemoveMedia}>REMOVE</button>
        }
        { !this.props.userProfile?.media.some(media => media.api_id === this.state.formData.api_id) &&
          <button onClick={this.handleAddMedia}>ADD</button>
        }
      </>
    );
  }
}
 
export default MediaForm;