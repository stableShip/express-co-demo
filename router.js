"use strict"
/**
 * 所有路由中间件配置
 * @param app
 */

module.exports = function (app) {

    app.use('/user', require('./routes/users'));
};
