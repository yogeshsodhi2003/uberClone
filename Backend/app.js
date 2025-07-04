const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');
const userRoutes = require('./routers/user.routes');

connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('uber');
});
app.use('/user' , userRoutes)


module.exports = app;
