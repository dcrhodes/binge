import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Landing from '../Landing/Landing'
import * as authService from '../../services/authService'
import * as profileAPI from '../../services/profileService'
import * as mediaAPI from '../../services/mediaService'
import ProfileList from '../ProfileList/ProfileList'
import ProfileDetails from '../ProfileDetails/ProfileDetails'
import MovieSearch from '../MovieSearch/MovieSearch'
import MovieDetails from '../MovieDetails/MovieDetails'


class App extends Component {
	state = {
		user: authService.getUser(),
		userProfile: null
	}

	handleLogout = () => {
		authService.logout()
		this.setState({ user: null, userProfile: null })
		this.props.history.push('/')
	}

	handleSignupOrLogin = async () => {
		this.setState({ user: authService.getUser(), userProfile: await profileAPI.getUserProfile() })
	}

	handleAddFriend = async friendId => {
		const updatedProfile = await profileAPI.friend(friendId)
		this.setState({ userProfile: updatedProfile })
	}

	handleRemoveFriend = async friendId => {
		const updatedProfile = await profileAPI.unfriend(friendId)
		this.setState({ userProfile: updatedProfile })
	}

	handleAddMedia = async media => {
    const updatedProfile = await mediaAPI.addMedia(media)
    this.setState({userProfile: updatedProfile})
  }

  handleRemoveMedia = async api_id => {
    const updatedProfile = await mediaAPI.removeMedia(api_id)
    this.setState({userProfile: updatedProfile})
  }

	async componentDidMount() {
		if (!this.state.userProfile){
			const userProfile = await profileAPI.getUserProfile()
			this.setState({ userProfile })
		}
	}

	render() {
		const { user, userProfile } = this.state
		return (
			<>
				<NavBar user={user} handleLogout={this.handleLogout} history={this.props.history} />
				<Route exact path='/'>
          <Landing user={user} />
        </Route>
				<Route exact path='/signup'>
          <Signup history={this.props.history} handleSignupOrLogin={this.handleSignupOrLogin}/>
        </Route>
				<Route exact path='/login'>
          <Login handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>
				<Route 
					exact path="/users"
					render={()=> 
						authService.getUser() ? 
						<ProfileList
							userProfile={userProfile}
							handleAddFriend={this.handleAddFriend}
							handleRemoveFriend={this.handleRemoveFriend}
						/>
						 : <Redirect to='/login'/>
				}/>
				<Route 
					exact path='/profile'
					render={({ location })=> 
						authService.getUser() ?
						<ProfileDetails
							location={location}
							userProfile={userProfile}
						/> : <Redirect to='/login' />
					}
				/>
				<Route
					exact path='/search/movies/:searchType/:query'
					render={({ match })=>
						authService.getUser() ?
						<MovieSearch 
							match={match}
							userProfile={userProfile}
							handleAddMedia={this.handleAddMedia}
							handleRemoveMedia={this.handleRemoveMedia}
						/> : <Redirect to='/login'/>
					}
				/>
				<Route
					exact path='/movies/:id'
					render={({ match })=>
						authService.getUser() ?
						<MovieDetails
							match={match}
							userProfile={userProfile}
						/> : <Redirect to='/login'/>
					}
				/>
			</>
		)
	}
}

export default App
