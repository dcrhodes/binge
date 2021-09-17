import { Router } from 'express'
import * as mediaCtrl from '../controllers/media.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

export {
  router
}

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/search/:type/:query', checkAuth, mediaCtrl.search)
router.get('/searchGenre/:type/:id', checkAuth, mediaCtrl.searchGenre)
router.get('/searchSimilar/:type/:id', checkAuth, mediaCtrl.searchSimilar)
router.get('/searchOne/:type/:id', checkAuth, mediaCtrl.searchOne)
router.post('/addMedia', checkAuth, mediaCtrl.addMedia)
router.delete('/removeMedia/:id', checkAuth, mediaCtrl.removeMedia)