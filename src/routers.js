const express = require('express');
const api = require('./controllers/api');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const mainRouter = new express.Router();
mainRouter.post('/upload', upload.single('image'), api.uploadPicture);
mainRouter.get('/list', api.listPictures);

exports.mainRouter = mainRouter;