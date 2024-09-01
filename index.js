//require("dotenv").config();


const express = require('express'),
     app = express(),
     bodyparser = require('body-parser');


//globall error handling
require('express-async-errors')

//const bodyParser = require('body-parser');
const db =require('./config/db');
//import the router from employee.controller
const router = require('./controllers/employee.controller');
const userRouter = require('./controllers/users.controller');

  
//middleware
app.use(bodyparser.json())
app.use('/api/employee' , router )
app.use('/api/users', userRouter)
app.use((err ,req ,res ,next) => {
     console.log(err)
     res.status(err.status || 500).send('Something went wrong!')
})

db.query("SELECT 1")
  .then(() => {
     console.log('db connection succeeded. ')
     app.listen(3000,
        () => console.log('server started at 3000')
    )
  }).catch((err => console.log('db connection failed. \n' + err)))

module.exports = db;