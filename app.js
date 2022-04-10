require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var appSettingRoutes = require('./web/common/route/app_setting')
var imageRoutes = require('./web/common/route/image');
var authRoutes = require('./web/common/route/auth');
var profileRoutes = require('./web/common/route/profile');
var userRoutes = require('./web/common/route/users');
var addressRoutes = require('./web/common/route/address')

var adminAppSettingRoutes = require('./web/admin/route/app_setting');
var adminManagerRoutes = require('./web/admin/route/manager');
var adminBranchRoutes = require('./web/admin/route/branch');
var adminMenuRoutes = require('./web/admin/route/menu');
var adminFileRoutes = require('./web/admin/route/file');
var adminMenuItemUnitRoutes = require('./web/admin/route/menu_item_units');

var managerMenuRoutes = require('./web/manager/route/menu');
var managerSalespersonRoutes = require('./web/manager/route/salesperson');
var managerOrderRoutes = require('./web/manager/route/order');

var salesPersonMenuRoutes = require('./web/salesperson/route/menu');
var salesPersonCustomerRoutes = require('./web/salesperson/route/customer');
var salesPersonOrderRoutes = require('./web/salesperson/route/order');

var customerMenuRoutes = require('./web/customer/route/menu');
var customerOrderRoutes = require('./web/customer/route/order');
var branchRoutes = require('./web/customer/route/branch');

const { authorizedAdminJwtToken, authorizedJwtToken, authorizedManagerJwtToken, authorizedSalespersonJwtToken, authorizedCustomerJwtToken } = require('./web/common/util/http_util');

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

app.use(`/images`, imageRoutes);
const base_uri = '/api'
app.use(`${base_uri}/appsetting`, appSettingRoutes);
app.use(`${base_uri}/address`, addressRoutes);
app.use(`${base_uri}/auth`, authRoutes);
app.use(`${base_uri}/profile`, authorizedJwtToken, profileRoutes);
app.use(`${base_uri}/user`, authorizedJwtToken, userRoutes);

app.use(`${base_uri}/admin/appsetting`, authorizedAdminJwtToken, adminAppSettingRoutes);
app.use(`${base_uri}/admin/manager`, authorizedAdminJwtToken, adminManagerRoutes);
app.use(`${base_uri}/admin/branch`, authorizedAdminJwtToken, adminBranchRoutes);
app.use(`${base_uri}/admin/menu`, authorizedAdminJwtToken, adminMenuRoutes);
app.use(`${base_uri}/admin/file`, authorizedAdminJwtToken, adminFileRoutes);
app.use(`${base_uri}/admin/menuItemUnit`, authorizedAdminJwtToken, adminMenuItemUnitRoutes);

app.use(`${base_uri}/manager/menu`, authorizedManagerJwtToken, managerMenuRoutes);
app.use(`${base_uri}/manager/salesperson`, authorizedManagerJwtToken, managerSalespersonRoutes);
app.use(`${base_uri}/manager/order`, authorizedManagerJwtToken, managerOrderRoutes);

app.use(`${base_uri}/salesperson/menu`, authorizedSalespersonJwtToken, salesPersonMenuRoutes);
app.use(`${base_uri}/salesperson/customer`, authorizedSalespersonJwtToken, salesPersonCustomerRoutes);
app.use(`${base_uri}/salesperson/order`, authorizedSalespersonJwtToken, salesPersonOrderRoutes);

app.use(`${base_uri}/order`, authorizedCustomerJwtToken, customerOrderRoutes);
app.use(`${base_uri}/menu`, customerMenuRoutes);
app.use(`${base_uri}/branch`, branchRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
