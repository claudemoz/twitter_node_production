const express = require('express')
const logger = require('morgan')
const path = require('path')
const errorHandler = require('errorhandler');
require('./database/db')

const app = express();
module.exports = app;

require('./config/session.config');
require('./config/passport.config');

const index = require('./routes/_index.route')

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(index)

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
} else {
    app.use((err, req, res, next) => {
        const code = err.code || 500
        res.status(code).json({
            code: code,
            message: code === 500 ? null : err.message
        })
    })
}