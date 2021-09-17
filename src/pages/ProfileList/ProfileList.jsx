import React, { Component } from 'react'
import { getAllProfiles } from '../../services/profileService'
import ProfileCard from '../../components/ProfileCard/ProfileCard'

class ProfileList extends Component {
  state = {
    profiles: []
  }

  async componentDidMount() {
    const profiles = await getAllProfiles()
    this.setState({ profiles })
  }

  render() { 
    return (
      <>
        <h1>Profile List</h1>
        {this.state.profiles.map(profile => 
          <ProfileCard
            profile={profile}
            key={profile._id}
            userProfile={this.props.userProfile}
            handleAddFriend={this.props.handleAddFriend}
            handleRemoveFriend={this.props.handleRemoveFriend}
          />
        )}
      </>
    );
  }
}
 
export default ProfileList;