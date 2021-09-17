import * as tokenService from "./tokenService"
const BASE_URL = "/api/media/"

export function search(type, query) {
  return fetch(`${BASE_URL}search/${type}/${query}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}


export function searchGenre(type, id) {
  return fetch(`${BASE_URL}searchGenre/${type}/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}


export function searchSimilar(type, id) {
  return fetch(`${BASE_URL}searchSimilar/${type}/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}


export function searchOne(type, id) {
  return fetch(`${BASE_URL}searchOne/${type}/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}

export function addMedia(media) {
  return fetch(
    `${BASE_URL}addMedia`,
    {
      method: 'POST',
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
      body: JSON.stringify(media)
    },
    { mode: "cors" })
  .then((res) => res.json())
}

export function removeMedia(api_id) {
  return fetch(
    `${BASE_URL}removeMedia/${api_id}`,
    {
      method: 'DELETE',
      headers: {'Authorization': 'Bearer ' + tokenService.getToken()},
    },
    { mode: "cors" })
  .then((res) => res.json())
}
