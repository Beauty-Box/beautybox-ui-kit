const { createServer } = require('http');
const express = require('express');
const story = require('./router');

const app = express();
const server = createServer(app);

app.use('ui-kit', story);

server.listen(5555, () => {
    console.log('Ui-kit server start on port 5555');
});
