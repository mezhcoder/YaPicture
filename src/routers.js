const express = require('express');
const api = require('./controllers/api');

const mainRouter = new express.Router();
mainRouter.post('/upload', api.uploadPicture);
mainRouter.get('/list', api.listPictures);

exports.mainRouter = mainRouter;