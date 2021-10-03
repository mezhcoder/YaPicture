const http = require('http');
const express = require('express');
const fileUpload = require('express-fileupload');
const setupMiddlewares = require('./middlewares');
const { mainRouter } = require('./routers');

const PORT = process.env.PORT || 8080;

const app = express();
setupMiddlewares(app);
app.use(fileUpload());
app.use('/', mainRouter);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});