var createError = require('http-errors');
var express = require('express');
//var favicon = require('serve-favicon');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var api = require('./routes/api');
var port = process.env.PORT || 3010
var server = express();

// view engine setup
//server.set('views', path.join(__dirname, 'views'));
//server.set('view engine', 'pug');
//server.use(favicon(path.join(__dirname, 'client/public', 'favicon.ico')));
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
//server.use(express.static(path.join(__dirname, 'public')));
//複数の静的コンテンツ用パスを指定する場合
//app.use('/static', express.static(path.join(__dirname, 'public')));
// override HTTP method to using CRUD
server.use(methodOverride('_method'));
// server.use(methodOverride(function (req, res) {
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//    // look in urlencoded POST bodies and delete it
//    var method = req.body._method
//    delete req.body._method
//    return method
//   }
//  }));
server.use('/_api/', api);
// correspond Express and React
server.use(express.static(path.join(__dirname, 'client/build')));
server.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// allow CORS
//   see. https://developer.mozilla.org/ja/docs/Web/HTTP/HTTP_access_control
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.get('*', (req, res) => {
  return handle(req, res);
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})

module.exports = server;
