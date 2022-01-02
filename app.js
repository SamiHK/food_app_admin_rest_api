require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var authRoutes = require('./web/common/route/auth');
var profileRoutes = require('./web/common/route/profile');
var userRoutes = require('./web/common/route/users');
var adminManagerRoutes = require('./web/admin/route/manager');
var adminBranchRoutes = require('./web/admin/route/branch');
const { authorizedAdminJwtToken, authorizedJwtToken } = require('./web/common/util/http_util');

var app = express();
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const base_uri = '/api'
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(`${base_uri}/auth`, authRoutes);
app.use(`${base_uri}/profile`, authorizedJwtToken, profileRoutes);
app.use(`${base_uri}/user`, authorizedJwtToken, userRoutes);
app.use(`${base_uri}/admin/manager`, authorizedAdminJwtToken, adminManagerRoutes);
app.use(`${base_uri}/admin/branch`, authorizedAdminJwtToken, adminBranchRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
