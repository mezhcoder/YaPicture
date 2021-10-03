const express = require('express');
const api = require('./controllers/api');
const multer  = require('multer')
const upload = multer({ dest: 'files/' })

const mainRouter = new express.Router();
mainRouter.post('/upload', upload.single('image'), api.uploadPicture);
mainRouter.get('/list', api.listPictures);
mainRouter.get('/image/:id', api.downloadPicture);
mainRouter.delete('/image/:id', api.deletePicture);
mainRouter.get('/merge', api.changeBackground);

exports.mainRouter = mainRouter;