
const express = require('express');
const expressValidator = require('express-validator');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
    let app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    consign({ cwd: 'src' })
        .include('controllers')
        .then('services')
        .into(app);

    return app;
};