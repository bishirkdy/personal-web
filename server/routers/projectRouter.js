import express from 'express'
import { authenticateUser, authorizeAdmin } from '../middleware/authenticateUser.js'
import { createProject, deleteProject, getAllProject, getTopSixProject, projectDetail, updateProject } from '../controllers/projectsController.js'
import { uploadProjectFiles } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.post('/create-project'  , uploadProjectFiles , createProject  )
router.get('/get-all-project'  , getAllProject  )
router.get('/project-details/:id' , projectDetail )
router.put('/update-project/:_id' , uploadProjectFiles , updateProject)
router.delete('/delete-project/:_id' , deleteProject)
router.get('/top-six-project'  ,  getTopSixProject)

export default router;