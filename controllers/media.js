// We'll need axios for our API calls
import axios from "axios"
import { Profile } from '../models/profile.js'
import { Media } from '../models/media.js'

export {
  search,
  searchGenre,
  searchSimilar,
  searchOne,
  addMedia,
  removeMedia
}

function addMedia (req, res) {
  // adding user's profile _id to req.body (for creating a new resource)
  req.body.collected_by = req.user.profile
  // find the profile of the logged in user
  Profile.findById(req.user.profile)
  .then(profile => {
    // check to see if the media exists in the database
    Media.findOne({api_id: req.body.api_id})
    .then(media =>  {
      // if a matching media is found
      if (media) {
        // add the user's profile id to the media.collected_by
        media.collected_by.push(req.user.profile)
        media.save()
        .then(media => {
          // push the updated media document into the user's profile
          profile.media.push(media._id)
          profile.save()
          // populate to keep userProfile accurate in <App> state
          profile.populate('media').populate('friends').execPopulate()
          .then((profile) => {
            // sending back the freshly updated, fully populated profile document
            res.json(profile)
          })
        })
        // if no match is found
      } else {
        // create a new media document
        Media.create(req.body)
        .then(media => {
          // add the new media document to the user's profile
          profile.media.push(media._id)
          profile.save()
          // populate to return all the subdocs for the user's profile
          profile.populate('media').populate('friends').execPopulate()
          .then((profile) => {
            // return the freshly update, fully populated profile document
            res.json(profile)
          })
        })
      }
    })
  })
}

function removeMedia(req, res) {
  // finding the media doc
  Media.findOne({ api_id: req.params.id })
  .then(media => {
    // removing the user's profile _id from the media doc's collected_by array
    media.collected_by.remove({ _id: req.user.profile })
    media.save()
    .then(() => {
      // find the user's profile
      Profile.findById(req.user.profile)
      .then(profile => {
        // find the index of the media doc in the user's profile's media array
        let mediaIdx = profile.media.findIndex(media => media.id === req.body.api_id)
        // then remove it
        profile.media.splice(mediaIdx, 1)
        profile.save()
        // repopulate before returning the updated document to the front end
        profile.populate('media').populate('friends').execPopulate()
        .then(()=> res.json(profile))
      })
    })
  })
}

function searchOne(req, res) {
  axios.get(`https://api.themoviedb.org/3/${req.params.type}/${req.params.id}?api_key=${process.env.API_KEY}&append_to_response=videos`)
  .then(response => {
    res.json(response.data)
  })
}

function searchSimilar(req, res) {
  axios.get(`https://api.themoviedb.org/3/${req.params.type}/${req.params.id}/similar?api_key=${process.env.API_KEY}`)
  .then(response => {
    res.json(response.data)
  })
}

function searchGenre(req, res) {
  axios.get(`https://api.themoviedb.org/3/discover/${req.params.type}?api_key=${process.env.API_KEY}&with_genres=${req.params.id}`)
  .then(response => {
    res.json(response.data)
  })
}

function search(req, res) {
  axios.get(`https://api.themoviedb.org/3/search/${req.params.type}?api_key=${process.env.API_KEY}&query=${req.params.query}`)
  .then(response => {
    res.json(response.data)
  })
}