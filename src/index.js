const path = require('path');
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const app = express()
const port = 3000
var methodOverride = require('method-override')
const route = require('./routes')
const db = require('./config/db')

// Connect to db
db.connect();

// POST
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(methodOverride('_method'))

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'))

//Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})