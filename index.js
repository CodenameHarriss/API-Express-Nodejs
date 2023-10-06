const express = require('express');
const connection = require('./connection');
const userRoute = require('./routes/user');
const prdRoute = require('./routes/product');
const saleRoute = require('./routes/sale');
const cors = require('cors');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/user', userRoute);
app.use('/product', prdRoute);
app.use('/sale', saleRoute);

module.exports = app;