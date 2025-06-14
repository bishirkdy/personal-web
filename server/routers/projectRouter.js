import express from 'express'
import { authenticateUser, authorizeAdmin } from '../middleware/authenticateUser.js'
import { createProject } from '../controllers/projectsController.js'
import { uploadProjectFiles } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.post('/create-project'  , uploadProjectFiles , createProject  )

export default router;