// require the express 
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db.js')
connectToDb()




//
app.use(cors());
app.use(express.json()); // Add parentheses to call the function
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Hello World12345!")
})

const userRoutes = require ("./routes/user.routes.js")
const captainRoutes = require ("./routes/captain.routes.js")



app.use('/users',userRoutes)
app.use('/captains',captainRoutes)
module.exports = app;
