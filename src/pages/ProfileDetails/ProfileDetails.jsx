import React from 'react'

const ProfileDetails = ({ location, userProfile }) => {
  const { profile } = location.state
  return (
    <>
      <h1>{profile.name}'s Deets</h1>

      <h2>Friends</h2>
      {profile.friends.map(profile => 
        <>
          <h3 key={profile._id}>
            {profile.name}
          </h3>
        </>
      )}
      <h2>TV Shows</h2>

      <h2>Movies</h2>
    </>
  );
}
 
export default ProfileDetails;