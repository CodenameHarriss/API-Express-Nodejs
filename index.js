const express = require('express');
const connection = require('./connection');
const userRoute = require('./routes/user');
const prdRoute = require('./routes/product');
const cors = require('cors');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/user', userRoute);
app.use('/product', prdRoute);

module.exports = app;