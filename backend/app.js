const express = require('express');
const path = require('path');
const useMiddleware = require('./middleware');
const indexRouter = require('./routes/index');
const messageRouter = require('./routes/messages')
const useErrorHandlers = require('./middleware/error-handlers');

const app = express();
useMiddleware(app);

const publicPath = path.join(__dirname, 'build');
app.use(express.static(publicPath));

// routes
app.use('/', indexRouter);
app.use('/', messageRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });
useErrorHandlers(app);


module.exports = app;
