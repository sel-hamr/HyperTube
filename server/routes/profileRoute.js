const express = require('express')
const router = express.Router()
const { getProfile, getMyProfile, editProfile, editPassword, editImage } = require(__dirname + '/../controllers/profileController')

router.get('/:userName', getProfile)
router.get('/', getMyProfile)
router.put('/', editProfile)
router.put('/password', editPassword)
router.put('/image', editImage)

module.exports = router
